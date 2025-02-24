import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "./../utils/asyncHandler.js";
import sendEmail from "./../utils/sendEmial.js";
import forgotPasswordEmailTemplate from "./../utils/forgotPasswordEmailTemplate.js";

export const home = (req, res) => {
   return apiResponse.success(res, 200, "Welcome to the backend");
};

export const registerController = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
   }

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      throw new ApiError(400, "User already exists");
   }

   const newUser = new User({ name, email, password });
   await newUser.save();

   return apiResponse.success(res, 201, "User registered successfully", {
      ...newUser._doc,
      password: undefined,
   });
});

export const loginController = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new ApiError(400, "All fields are required.");
   }

   const user = await User.findOne({ email });

   if (!user) {
      throw new ApiError(404, "User not found.");
   }

   const isPasswordValid = await user.isCorrectPassword(password);

   if (!isPasswordValid) {
      throw new ApiError(401, "Password is incorrect.");
   }

   const token = user.generateToken();

   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
   });

   return apiResponse.success(res, 200, "Welcome! You’re logged in.", {
      token,
   });
});

export const logoutController = asyncHandler(async (req, res) => {

   res.clearCookie("token");

   return apiResponse.success(res, 200, "Logged out successfully.");
});

export const getUserContoller = asyncHandler(async (req, res) => {
   const user = await User.findById({ _id: req.user._id }, "-password");

   if (!user) {
      throw new ApiError(404, "User not found.");
   }

   return apiResponse.success(res, 200, "User found.", user);
});

export const forgotPasswordController = asyncHandler(async (req, res) => {
   const { email } = req.body;

   if (!email) {
      throw new ApiError(400, "Email is required.");
   }

   const user = await User.findOne({ email }, "-password");

   if (!user) {
      throw new ApiError(404, "User not found.");
   }

   const OTP = user.generateForgotPasswordOTP();
   await user.save();

   await sendEmail({
      sendTo: "adarsh.patil6266@gmail.com",
      subject: "Forgot Password",
      html: forgotPasswordEmailTemplate({ name: user.name, otp: OTP }),
   });

   return apiResponse.success(
      res,
      200,
      "Forgot Password OTP Sent Successfully."
   );
});

export const verifyForgotPasswordOTPController = asyncHandler(
   async (req, res) => {
      const { email, OTP } = req.body;

      if (!email) {
         throw new ApiError(400, "Email is required.");
      }

      if (!OTP) {
         throw new ApiError(400, "OTP is required.");
      }

      const user = await User.findOne({ email }, "-password");

      if (!user) {
         throw new ApiError(404, "User not found.");
      }

      if (user.forgotPasswordOTP !== OTP) {
         throw new ApiError(400, "Invalid OTP.");
      }

      return apiResponse.success(res, 200, "OTP verified successfully.");
   }
);

export const resetPasswordController = asyncHandler(async (req, res) => {
   const { email, OTP, password } = req.body;

   if (!email || !OTP || !password) {
      throw new ApiError(400, "All fields are required.");
   }

   const user = await User.findOne({ email })
      .select("+forgotPasswordOTP")
      .select("+forgotPasswordOTPExpires");

   if (!user) {
      throw new ApiError(404, "User not found.");
   }

   if (user.forgotPasswordOTP !== OTP) {
      throw new ApiError(400, "Invalid OTP.");
   }

   if (user.forgotPasswordOTPExpires < Date.now()) {
      throw new ApiError(400, "OTP has expired.");
   }

   user.password = password;
   user.forgotPasswordOTP = undefined;
   user.forgotPasswordOTPExpires = undefined;
   await user.save();

   return apiResponse.success(res, 200, "Password reset successfully.");
});
