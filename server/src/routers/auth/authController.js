import passport from 'passport';
import { errorMessage, successMessage, baseMessage } from '../../lib/responseMessage.js';
import { UserValidate } from '../../lib/validate.js';

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  // TODO: limit try to sign in

  // validation
  if (!UserValidate.email(email)) return res.json(errorMessage(baseMessage.INVALID_EMAIL));
  if (!UserValidate.password(password)) return res.json(errorMessage(baseMessage.INVALID_PASSWORD));

  passport.authenticate('local', (error, user, loginFailMessage) => {
    if (error ?? loginFailMessage) {
      if (error) console.error(new Error(error?.message));
      return res.json(errorMessage(error ?? loginFailMessage));
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return res.json(errorMessage(baseMessage.SERVER_ERROR));
      }
      const { userId, email, nickname } = user;
      return res.json(successMessage(baseMessage.SUCCESS_SIGNIN, { userId, email, nickname }));
    });
  })(req, res, next);
};

const signOut = (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) console.error(error);
    return res.json(successMessage(baseMessage.SUCCESS_SIGNOUT));
  });
};

// TODO: google login

export default { signIn, signOut };
