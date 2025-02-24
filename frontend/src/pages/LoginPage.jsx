import React, { useEffect, useState, useContext } from "react";
import Divider from "../components/Divider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import { IoMdLogIn } from "react-icons/io";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { AuthContext } from "../context/AuthContext";
import CircularLoader from "../components/CircularLoader";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const response = await Axios.post("/auth/login", { email, password });

			toast.success(response.data.message);
			login(response.data.data.token);
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<div className="h-[450px] w-[400px] p-8 bg-neutral-800 rounded-lg flex flex-col gap-5 select-none shadow-2xl">
				<h1 className="h-14 w-full text-2xl font-semibold flex items-center gap-2">
					<IoMdLogIn size={30} /> Login
				</h1>
				<form className="w-full h-full flex flex-col justify-between">
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
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className="bg-neutral-700 rounded outline-none px-3 py-2 placeholder:text-sm placeholder:text-neutral-400 placeholder:tracking-wide"
						/>
					</div>

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

					<p
						onClick={() => navigate("/forgot-password")}
						className="text-sm cursor-pointer hover:text-neutral-200 transition-colors text-right"
					>
						Forgot Password?
					</p>

					<div
						onClick={handleSubmit}
						className="bg-red-500 text-white text-center flex items-center justify-center gap-2 text-lg font-medium py-1.5 rounded cursor-pointer hover:bg-red-600 transition-colors"
					>
						{loading && <CircularLoader tailwindcss="border-neutral-300 border-t-neutral-500" />} Login
					</div>

					<div className="text-sm text-center">
						Don't have an account?{" "}
						<span
							onClick={() => navigate("/register")}
							className="text-blue-400 cursor-pointer transition-colors"
						>
							Register
						</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default LoginPage;
