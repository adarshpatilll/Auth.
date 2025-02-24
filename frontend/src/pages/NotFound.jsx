import React from "react";
import CircularLoader from "../components/CircularLoader";

const NotFound = () => {
	return (
		<div className="flex w-full items-center justify-center h-screen">
			<img
				className="w-[700px] select-none"
				draggable={false}
				src="/assets/not_found.svg"
				alt="Not Found"
			/>
		</div>
	);
};

export default NotFound;
