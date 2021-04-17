module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  if (!username.trim()) errors.username = "Username cannot be empty";

  if (!email.trim()) errors.email = "Email cannot be empty";

  if (!email.match(regEx)) errors.email = "Email is not valid";

  if (!password.trim()) errors.password = "Password cannot be empty";

  if (confirmPassword !== password)
    errors.confirmPassword = "Passwords must match";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (!username.trim()) errors.username = "Username cannot be empty";

  if (!password.trim()) errors.password = "Password cannot be empty";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
