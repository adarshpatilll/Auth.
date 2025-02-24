import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Toastify from "./components/Toastify";
import NotFound from "./pages/NotFound";
import ForgotPasswordPage from "./pages/ForgotPasswordFolder/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ForgotPasswordFolder/ResetPasswordPage";
import OtpVerificationPage from "./pages/ForgotPasswordFolder/OtpVerificationPage";

const App = () => {
	return (
		<div
			className="h-screen w-full flex flex-col bg-neutral-900 text-white relative"
			onContextMenu={(e) => e.preventDefault()}
		>
			<Navbar />

			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				<Route path="/otp-verification" element={<OtpVerificationPage />} />
				<Route path="/" element={<HomePage />} />

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Toastify />
		</div>
	);
};

export default App;
