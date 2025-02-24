import axios from "axios";

const Axios = axios.create({
	baseURL:
		import.meta.env.VITE_NODE_ENV === "development"
			? import.meta.env.VITE_LOCAL_BACKEND_URL
			: import.meta.env.VITE_RENDER_BACKEND_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default Axios;
