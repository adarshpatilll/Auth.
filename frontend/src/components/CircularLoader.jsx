import React from "react";

const CircularLoader = ({tailwindcss="border-neutral-100 border-t-neutral-700", size="5"}) => {
	return (
		<div className={`w-${size} h-${size} ${tailwindcss} border-2 rounded-full animate-spin`}></div>
	);
};

export default CircularLoader;
