import React, { useEffect, useState } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import PasswordValidation from "../../components/PasswordValidation";
import CircularLoader from "../../components/CircularLoader";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const [loading, setLoading] = useState(false);  

	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		try {
         setLoading(true);
			const response = await Axios.put("/auth/reset-password", {
				email: location?.state?.email,
				OTP: location?.state?.OTP,
				password,
			});
			toast.success(response?.data?.message);
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
         setLoading(false);
      }
	};

	useEffect(() => {
		if (
			localStorage.getItem("token") ||
			!location?.state?.email ||
			!location?.state?.OTP
		) {
			navigate("/");
		}
	}, []);

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<div className="h-[500px] w-[400px] p-8 bg-neutral-800 rounded-lg flex flex-col gap-3 select-none shadow-2xl">
				<h1 className="h-14 w-full text-2xl font-semibold flex items-center gap-2">
					<TbPasswordFingerprint /> Reset Password
				</h1>

				<form
					onSubmit={handleSubmit}
					className="w-full h-full flex flex-col justify-around"
				>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label className="font-semibold" htmlFor="password">
								Password
							</label>
							<div className="flex bg-neutral-700 rounded items-center justify-between">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter Password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									className="w-full outline-none px-3 py-2 placeholder:text-sm placeholder:text-neutral-400 placeholder:tracking-wide"
								/>
								<div
									onClick={() => setShowPassword(!showPassword)}
									className="w-12 h-full cursor-pointer flex justify-center items-center"
								>
									{showPassword ? (
										<PiEyeBold size={18} />
									) : (
										<PiEyeClosedBold size={18} />
									)}
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label className="font-semibold" htmlFor="confirmPassword">
								Confirm Password
							</label>
							<div className="flex bg-neutral-700 rounded items-center justify-between">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									id="confirmPassword"
									placeholder="Enter Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									value={confirmPassword}
									className="w-full outline-none px-3 py-2 placeholder:text-sm placeholder:text-neutral-400 placeholder:tracking-wide"
								/>
								<div
									onClick={() =>
										setShowConfirmPassword(!showConfirmPassword)
									}
									className="w-12 h-full cursor-pointer flex justify-center items-center"
								>
									{showConfirmPassword ? (
										<PiEyeBold size={18} />
									) : (
										<PiEyeClosedBold size={18} />
									)}
								</div>
							</div>

							<PasswordValidation
								password={password}
                        confirmPassword={confirmPassword}
								setIsPasswordValid={setIsPasswordValid}
							/>
						</div>
					</div>

					<button
						disabled={!isPasswordValid}
						className={`bg-neutral-100 mt-2 text-black flex items-center justify-center gap-2 text-center text-lg font-medium py-1.5 rounded transition-colors ${
							!isPasswordValid
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-neutral-300 cursor-pointer"
						}`}
					>
						{loading && <CircularLoader tailwindcss="border-neutral-400 border-t-neutral-800" />} Reset Password
					</button>
				</form>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
