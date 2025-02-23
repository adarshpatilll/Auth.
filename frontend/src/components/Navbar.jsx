import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";

const Navbar = () => {
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("token")
	);

	const logoutHandler = async () => {
      try {
         const response = await Axios.post("/auth/logout");
			toast.success(response.data.message);
			localStorage.removeItem("token");
         navigate("/login");
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		setIsAuthenticated(!!localStorage.getItem("token"));
	}, [localStorage.getItem("token")]);

	return (
		<div className="w-full h-16 bg-neutral-800 flex justify-between items-center px-10 sticky top-0 left-0 shadow-md z-50">
			<h1 className="text-xl font-semibold">Auth.</h1>
			{!isAuthenticated ? (
				<ul className="flex gap-5 font-medium">
					<NavLink
						to="/login"
						className="text-white bg-red-500 px-5 py-1 rounded-bl-xl rounded-tr-xl hover:-rotate-3 hover:bg-red-600 transition-all"
					>
						Login
					</NavLink>
					<NavLink
						to="/register"
						className="text-black bg-neutral-100 px-5 py-1 rounded-br-xl rounded-tl-xl hover:rotate-3 hover:bg-neutral-300 transition-all"
					>
						Register
					</NavLink>
				</ul>
			) : (
				<button
					onClick={logoutHandler}
					className="text-white bg-red-500 px-5 py-1 rounded-bl-xl rounded-tr-xl hover:-rotate-3 hover:bg-red-600 transition-all"
				>
					Logout
				</button>
			)}
		</div>
	);
};

export default Navbar;
