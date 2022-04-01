import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { userModel } from '../../models/index.js';
import { baseMessage } from '../../lib/responseMessage.js';

export default () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      try {
        const getUserByEmailResult = await userModel.getUserByEmail(email).catch((error) => console.error(error));
        if (getUserByEmailResult === undefined) return done(baseMessage.DB_ERROR);

        // users: [] | [ { status: 'a' | 'd' }, ...]
        // TODO: deal with deleted user
        const activeUser = getUserByEmailResult.filter((user) => user.status === 'a');
        if (!activeUser.length) return done(null, false, baseMessage.CANNOT_FIND_EMAIL);
        if (activeUser.length > 1) return done(baseMessage.EMAIL_REDUNDANCY_ERROR);

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
