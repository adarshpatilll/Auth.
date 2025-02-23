import React, { useEffect, useRef, useState } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";

const OtpVerificationPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef([]);

	const email = location?.state?.email || "";

	const [otp, setOtp] = useState(["", "", "", "", "", ""]);

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);

		if (value && index < 5) {
			inputRef.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRef.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await Axios.put("/auth/verify-forgot-password-otp", {
				email,
				OTP: otp.join("").toString(),
			});
			toast.success(response.data.message);
			navigate("/reset-password", { state: { email, OTP: otp.join("") } });
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token") || !location?.state?.email) {
			navigate("/");
		}
	}, []);

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<div className="h-[300px] w-[400px] p-8 bg-neutral-800 rounded-lg flex flex-col gap-3 select-none shadow-2xl">
				<h1 className="h-14 w-full text-2xl font-semibold flex items-center gap-2">
					<TbPasswordFingerprint /> OTP Verification
				</h1>

				<form
					onSubmit={handleSubmit}
					className="w-full h-full flex flex-col justify-evenly"
				>
					<div className="flex gap-2">
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								maxLength="1"
								className="w-12 h-12 text-center text-xl font-bold border border-gray-500 rounded bg-neutral-700 outline-none focus:border-green-600"
								value={digit}
								onChange={(e) => handleChange(index, e)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								ref={(el) => (inputRef.current[index] = el)}
							/>
						))}
					</div>
					<button className="bg-green-700 rounded py-2 text-lg font-semibold hover:bg-green-800 transition-all">
						Verify OTP
					</button>
				</form>
			</div>
		</section>
	);
};

export default OtpVerificationPage;
