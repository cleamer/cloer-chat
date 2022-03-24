import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import passportModel from './passportModel.js';
import { baseMessage } from '../../lib/responseMessage.js';

export default () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      try {
        const users = await passportModel.getUserByEmail(email).catch((error) => console.error(error));
        if (users === undefined) return done(baseMessage.DB_ERROR);

        // users: [] | [ { status: 'a' | 'd' }, ...]
        // TODO: deal with deleted user
        const activeUser = users.filter((user) => user.status === 'a');
        if (!activeUser) return done(null, false, baseMessage.CANNOT_FIND_EMAIL);
        if (activeUser.length > 1) {
          console.error(new Error('There are active users who have the same e-mail.'));
          return done(baseMessage.DB_ERROR);
        }
        const [user] = activeUser;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return done(null, false, baseMessage.INCORRECT_PASSWORD);
        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(baseMessage.SERVER_ERROR);
      }
    })
  );
};
