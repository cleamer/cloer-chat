import passport from 'passport';
import local from './localStrategy.js';
import { userModel } from '../../models/index.js';
import { baseMessage } from '../../lib/responseMessage.js';

// TODO:
passport.serializeUser((user, done) => done(null, user.userId));

passport.deserializeUser(async (userId, done) => {
  try {
    const [user] = await userModel.getUserByUserId(userId);
    if (!user) return done(null, false, baseMessage.CANNOT_FIND_USERID); // FIXME: just in case
    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(baseMessage.DB_ERROR);
  }
});

local();
export default passport;
