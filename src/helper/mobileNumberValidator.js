import validator from "validator";
export default mobileNumberValidator = (mobileNumber) => {
	if (!mobileNumber) return "Mobile Number can't be empty.";
	if (isNaN(mobileNumber)) return "Enter Valid Mobile Number.";
	if (!validator.isMobilePhone(mobileNumber, ["en-IN"]))
		return "Enter Valid Mobile Number";
	return "";
};
