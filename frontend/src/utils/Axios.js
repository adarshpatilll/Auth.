import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Axios = axios.create({
	baseURL: process.env.BACKEND_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default Axios;
