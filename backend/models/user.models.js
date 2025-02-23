import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
   },
   forgotPasswordOTP: {
      type: String,
      default: undefined,
   },
   forgotPasswordOTPExpires: {
      type: Date,
      default: undefined,
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }

   this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.isCorrectPassword = async function (password) {
   return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
   );
};

userSchema.methods.generateForgotPasswordOTP = function () {
   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP number
   this.forgotPasswordOTP = otp;
   this.forgotPasswordOTPExpires = Date.now() + 60 * 60 * 1000; // 1 hour
   return otp;
};

const User = mongoose.model("User", userSchema);

export default User;
