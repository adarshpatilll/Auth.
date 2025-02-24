import React, { useEffect, useState } from "react";
import Divider from "../components/Divider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "./../utils/Axios";
import { RiAccountCircleLine } from "react-icons/ri";
import { PiEyeBold } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import PasswordValidation from "../components/PasswordValidation";
import CircularLoader from "../components/CircularLoader";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [isPasswordValid, setIsPasswordValid] = useState(false);

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
			const response = await Axios.post("/auth/register", {
				email,
				name: fullname,
				password,
			});

			toast.success(response.data.message);
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<div className="h-[700px] w-[450px] p-8 bg-neutral-800 rounded-lg flex flex-col gap-5 shadow-2xl">
				<h1 className="h-14 w-full text-2xl font-semibold flex items-center gap-2">
					<RiAccountCircleLine size={30} /> Register
				</h1>
				<form
					onSubmit={handleSubmit}
					className="w-full h-full flex flex-col justify-between gap-3"
				>
					<div className="flex flex-col gap-2">
						<label className="font-semibold" htmlFor="fullname">
							Full Name
						</label>
						<input
							type="text"
							name="fullname"
							id="fullname"
							placeholder="Enter Full Name"
							autoFocus
							onChange={(e) => setFullname(e.target.value)}
							value={fullname}
							className="bg-neutral-700 rounded outline-none px-3 py-2 placeholder:text-sm placeholder:text-neutral-400 placeholder:tracking-wide"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="font-semibold" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter Email"
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

					<button
						onClick={handleSubmit}
						disabled={!isPasswordValid}
						className={`bg-neutral-100 mt-2 flex items-center justify-center gap-2 text-black text-center text-lg font-medium py-1.5 rounded transition-colors ${
							!isPasswordValid
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-neutral-300 cursor-pointer"
						}`}
					>
						{loading && <CircularLoader tailwindcss="border-neutral-100 border-t-neutral-700" />}Register
					</button>

					<div className="flex justify-center items-center">
						<Divider />
						<p className="text-sm px-2">or</p>
						<Divider />
					</div>

					<div className="text-sm text-center">
						Already have an account.{" "}
						<span
							onClick={() => navigate("/login")}
							className="text-blue-400 text-sm text-center cursor-pointer transition-colors"
						>
							Login
						</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default RegisterPage;
