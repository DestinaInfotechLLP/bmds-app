import validator from "validator";
export default passwordValidator = (password) => {
  if (!password) return "Password can't be empty.";
  if (!validator.isStrongPassword(password))
    return "Your password must be at least 8 characters long, contain at least one number, one character symbol and have a mixture of uppercase and lowercase letters.";
  return "";
};
