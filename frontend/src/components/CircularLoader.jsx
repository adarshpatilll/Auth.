import React from "react";

const CircularLoader = ({tailwindcss="border-neutral-100 border-t-neutral-700"}) => {
	return (
		<div className={`w-5 h-5 ${tailwindcss} border-2 rounded-full animate-spin`}></div>
	);
};

export default CircularLoader;
