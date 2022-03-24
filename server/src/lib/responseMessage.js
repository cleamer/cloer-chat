export const errMessage = (message) => message;
export const successMessage = (message, result) => ({ ...message, result });

const JSONmessage = (isSuccess, code, message) => ({ isSuccess, code, message });
export const baseMessage = {
  // 2XXX: Succcess
  SUCCESS_INSERT_USER: JSONmessage(true, 2000, 'It was successed to insert a user'),

  // 3XXX: Validation error
  INVALID_EMAIL: JSONmessage(false, 3000, 'Wrong or invalid e-mail address.'),
  INVALID_NICKNAME: JSONmessage(false, 3001, 'Nickname requires minimum 4 and maximum 10 characters .'),
  INVALID_PASSWORD: JSONmessage(false, 3002, 'Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.'),

  EXISTING_EMAIL: JSONmessage(false, 3003, 'An account already exists with that email.'),
  EXISTING_NICKNAME: JSONmessage(false, 3004, 'An account already exists with that nickaname'),

  // 4XXX: Wrong request

  // 5:XXX Server error
  DB_ERROR: JSONmessage(false, 5000, 'Database Error'),
  SERVER_ERROR: JSONmessage(false, 5001, 'Server Error'),
};
