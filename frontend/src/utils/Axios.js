import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Axios = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? process.env.LOCAL_BACKEND_URL
			: process.env.RENDER_BACKEND_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default Axios;
