import bcrypt from 'bcryptjs';
import passport from 'passport';
import {
  Strategy as LocalStrategy, 
  VerifyFunction
} from 'passport-local';

import userService from '../services/users';
import BadUsernamePasswordError from '../errors/BadUsernamePasswordError'
import NotFoundError from '../errors/NotFoundError'

const verifyPassword = async function(username, password, done){
  try {
    // get user
    const user = await userService.getUserByUsername(username);
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return done(null, false, {message: 'Incorrect password'});
    }
    // return user in passportjs expected format for serialization
    return done(null, user);
  } 
  catch (err) {
    // NotFoundError in try block can only come from getUserByUsername.
    // Swap NotFoundError with BadUsernamePasswordError to avoid letting
    // client know a user does not exist.
    if (err instanceof NotFoundError){
      return done(new BadUsernamePasswordError());
    }
    return done(err);
  }
} as VerifyFunction;

passport.use(new LocalStrategy(verifyPassword));

passport.serializeUser((user, done) => {
  // passportjs wants to serialize and send only an identifier to client
  // identifier is used get whole object from at deserialization
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    // grab user using with seralized id
    const user = await userService.getUserById(id);
    done(null, user);
  } 
  catch (err) {
    done(err);
  }
});

export default passport;
