import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";

const HomePage = () => {
	const [name, setName] = useState("");

	const navigate = useNavigate();

	const fetchUser = async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/login");
			return;
		}

		try {
			const response = await Axios.get("/auth/getUser", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setName(response.data.data.name);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<section className="h-screen w-full flex justify-center items-center">
			<h1 className="text-4xl font-semibold">Welcome {name}!</h1>
		</section>
	);
};

export default HomePage;
