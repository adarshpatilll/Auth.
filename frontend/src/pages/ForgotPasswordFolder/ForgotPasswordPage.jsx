import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiLockKeyBold } from "react-icons/pi";
import { toast } from "react-toastify";
import Axios from "../../utils/Axios";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await Axios.put("/auth/forgot-password", { email });
			toast.success(response.data.message);
			navigate("/otp-verification", { state: { email } });
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<div className="h-[300px] w-[400px] p-8 bg-neutral-800 rounded-lg flex flex-col gap-3 select-none shadow-2xl">
				<h1 className="h-14 w-full text-2xl font-semibold flex items-center gap-2">
					<PiLockKeyBold /> Forgot Password
				</h1>

				<form
					onSubmit={handleSubmit}
					className="w-full h-full flex flex-col justify-evenly"
				>
					<div className="flex flex-col gap-2">
						<label className="font-semibold" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter Email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-neutral-700 rounded outline-none px-3 py-2 placeholder:text-sm placeholder:text-neutral-400 placeholder:tracking-wide"
						/>
					</div>
					<button className="bg-green-700 rounded py-2 text-lg font-semibold hover:bg-green-800 transition-all">
						Send OTP
					</button>
				</form>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
