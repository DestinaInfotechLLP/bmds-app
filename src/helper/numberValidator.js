import validator from "validator";
export default numberValidator = (text) => {
  if (validator.isEmpty(text)) return "Field Should be not empty";
  //   if (!validator.isAlpha(text, ["en-IN"])) return "Please Enter Valid Input";
  return;
};
