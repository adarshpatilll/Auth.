import React, { useEffect, useState } from "react";
import { HiShieldCheck } from "react-icons/hi";

const PasswordValidation = ({
	password,
	setIsPasswordValid,
	confirmPassword = "",
}) => {
	const [isConatinsLowercase, setIsContainsLowercase] = useState(false);
	const [isContainsUppercase, setIsContainsUppercase] = useState(false);
	const [isContainsNumber, setIsContainsNumber] = useState(false);
	const [isLengthMoreThan6, setIsLengthMoreThan6] = useState(false);
	const [isContainsSpecialCharacter, setIsContainsSpecialCharacter] =
		useState(false);
	const [isPasswordMatch, setIsPasswordMatch] = useState(false);

	const checkPassword = (password, confirmPassword) => {
		setIsContainsLowercase(/[a-z]/.test(password));
		setIsContainsUppercase(/[A-Z]/.test(password));
		setIsContainsNumber(/[0-9]/.test(password));
		setIsLengthMoreThan6(password.length > 6);
		setIsContainsSpecialCharacter(
			/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
		);
		setIsPasswordMatch(password === confirmPassword);

		const isValid =
			/[a-z]/.test(password) &&
			/[A-Z]/.test(password) &&
			/[0-9]/.test(password) &&
			password.length > 6 &&
			/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) &&
			password === confirmPassword;

		setIsPasswordValid(isValid);
	};

	useEffect(() => {
		checkPassword(password, confirmPassword);
	}, [password, confirmPassword]);

	return (
		<div className="flex flex-col justify-between gap-1 rounded w-full p-2 border border-dashed border-neutral-700">
			<CustomDiv
				validation={isConatinsLowercase}
				message={"Password should contain lowercase letters!"}
			/>
			<CustomDiv
				validation={isContainsUppercase}
				message={"Password should contain uppercase letters!"}
			/>
			<CustomDiv
				validation={isContainsNumber}
				message={"Password should contains numbers also!"}
			/>
			<CustomDiv
				validation={isLengthMoreThan6}
				message={"Password length should be more than 6."}
			/>
			<CustomDiv
				validation={isContainsSpecialCharacter}
				message={"Password should contains special character!"}
			/>

			<CustomDiv
				validation={isPasswordMatch}
				message={"Passwords are matched!"}
			/>
		</div>
	);
};

const CustomDiv = ({ validation, message }) => {
	return (
		<div className="flex gap-3 items-center">
			<HiShieldCheck
				className={validation ? "text-green-500" : "text-red-500"}
			/>
			<p className="text-xs text-neutral-300">{message}</p>
		</div>
	);
};

export default PasswordValidation;
