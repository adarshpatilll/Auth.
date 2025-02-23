import express from "express";
import {
   forgotPasswordController,
   getUserContoller,
   home,
   loginController,
   logoutController,
   registerController,
   resetPasswordController,
   verifyForgotPasswordOTPController,
} from "../controllers/auth.controllers.js";
import auth from "./../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/auth", home);
router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);
router.get("/auth/getUser", auth, getUserContoller);
router.put("/auth/forgot-password", forgotPasswordController);
router.put(
   "/auth/verify-forgot-password-otp",
   verifyForgotPasswordOTPController
);
router.put("/auth/reset-password", resetPasswordController);

export default router;
