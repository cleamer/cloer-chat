export const errorMessage = (message) => message;
export const successMessage = (message, result) => ({ ...message, result });

const JsonMessage = (isSuccess, code, message) => ({ isSuccess, code, message });
export const baseMessage = {
  // 2XXX: Succcess
  SUCCESS_INSERT_USER: JsonMessage(true, 2000, 'It was successed to insert a user.'),
  SUCCESS_SIGNIN: JsonMessage(true, 2001, 'It was successed to sign in.'),
  SUCCESS_SIGNOUT: JsonMessage(true, 2002, 'It was successed to sign out.'),

  // 3XXX: Validation error
  INVALID_EMAIL: JsonMessage(false, 3000, 'Wrong or invalid e-mail address.'),
  INVALID_NICKNAME: JsonMessage(false, 3001, 'Nickname requires minimum 4 and maximum 10 characters.'),
  INVALID_PASSWORD: JsonMessage(false, 3002, 'Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.'),

  EXISTING_EMAIL: JsonMessage(false, 3003, 'An account already exists with that e-mail address.'),
  EXISTING_NICKNAME: JsonMessage(false, 3004, 'An account already exists with that nickaname.'),

  CANNOT_FIND_EMAIL: JsonMessage(false, 3005, 'We cannot find an account with that e-mail address'),
  CANNOT_FIND_USERID: JsonMessage(false, 3006, 'We cannot find an account with that userId'),
  INCORRECT_PASSWORD: JsonMessage(false, 3007, 'Your password is incorrect'),
  // DORMANT_ACCOUNT: JsonMessage(false, 3005, 'Your account is a dormant account.'),

  // 4XXX: Wrong request
  LOGIN_REQUIRED: JsonMessage(false, 4000, 'Must be logged in.'),
  LOGOUT_REQUIRED: JsonMessage(false, 4001, 'Must be logged out'),
  WRONG_PATH: JsonMessage(false, 4004, 'Wrong path.'),

  // 5:XXX Server error
  DB_ERROR: JsonMessage(false, 5000, 'Database Error!'),
  SERVER_ERROR: JsonMessage(false, 5001, 'Server Error!'),
};
