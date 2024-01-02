import validator from "validator";

const confirmPasswordValidator = (password, confirmPassword) => {
	if (password !== confirmPassword)
		return "Your Password and Confirm Password Not matched";
};

export default confirmPasswordValidator;
