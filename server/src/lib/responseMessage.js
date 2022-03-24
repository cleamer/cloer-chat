export const errorMessage = (message) => message;
export const successMessage = (message, result) => ({ ...message, result });

const JsonMessage = (isSuccess, code, message) => ({ isSuccess, code, message });
export const baseMessage = {
  // 2XXX: Succcess
  SUCCESS_INSERT_USER: JsonMessage(true, 2000, 'It was successed to insert a user.'),

  // 3XXX: Validation error
  INVALID_EMAIL: JsonMessage(false, 3000, 'Wrong or invalid e-mail address.'),
  INVALID_NICKNAME: JsonMessage(false, 3001, 'Nickname requires minimum 4 and maximum 10 characters.'),
  INVALID_PASSWORD: JsonMessage(false, 3002, 'Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.'),

  EXISTING_EMAIL: JsonMessage(false, 3003, 'An account already exists with that email.'),
  EXISTING_NICKNAME: JsonMessage(false, 3004, 'An account already exists with that nickaname.'),

  // 4XXX: Wrong request
  LOGIN_REQUIRED: JsonMessage(false, 4000, 'Must be logged in.'),
  LOGOUT_REQUIRED: JsonMessage(false, 4001, 'Must be logged out'),

  // 5:XXX Server error
  DB_ERROR: JsonMessage(false, 5000, 'Database Error!'),
  SERVER_ERROR: JsonMessage(false, 5001, 'Server Error!'),
};
