import validator from "validator";
export default emailValidator = (email) => {
	if (!email) return "Email Can't be Empty";
	if (!validator.isEmail(email)) return "Please Enter Valid Email Id";
};
