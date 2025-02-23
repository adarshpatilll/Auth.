import { ToastContainer, Bounce } from "react-toastify";

const Toastify = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={1000}
			hideProgressBar={true}
			newestOnTop={true}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss={false}
			draggable={true}
			pauseOnHover={false}
			theme="dark"
			transition={Bounce}
		/>
	);
};

export default Toastify;
