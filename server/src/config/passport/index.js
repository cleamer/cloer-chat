import passport from 'passport';
import local from './localStrategy.js';
import passportModel from './passportModel.js';
import { baseMessage } from '../../lib/responseMessage.js';

// TODO:
passport.serializeUser((user, done) => done(null, user.userId));

passport.deserializeUser(async (userId, done) => {
  try {
    const [user] = await passportModel.getUserByUserId(userId);
    if (!user) return done(null, false, baseMessage.CANNOT_FIND_USERID); // FIXME: just in case
    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(baseMessage.DB_ERROR);
  }
});

local();
export default passport;
