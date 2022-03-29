import { errorMessage, baseMessage } from './responseMessage.js';

// export const isLoggedIn = (req, res, next) => {
//   next(); //FIXME: for client test
// };
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.json(errorMessage(baseMessage.LOGIN_REQUIRED));
};
export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  else return res.json(errorMessage(baseMessage.LOGOUT_REQUIRED));
};
