const validator = require("validator");
const isEmpty = require("./../isEmpty");

module.exports = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be greater than 7 characters.";
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
