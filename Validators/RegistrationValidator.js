const validator = require("validator");
const isEmpty = require("./../isEmpty");

module.exports = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.name, { min: 4, max: 20 })) {
    errors.name = "Name must be between 4 to 20 characters.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be greater than 7 characters.";
  }

  if (!validator.equals(data.password, data.confirmpassword)) {
    errors.password = "Passwords don't match";
  }

  let isValid = false;

  if (Object.keys(errors).length === 0) {
    isValid = true;
  }

  return {
    errors,
    isValid,
  };
};
