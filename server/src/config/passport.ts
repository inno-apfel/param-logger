import bcrypt from 'bcryptjs';
import passport from 'passport';
import {
  Strategy as LocalStrategy, 
  VerifyFunction
} from 'passport-local';

import userService from '../services/users';

const verifyPassword = async function(username, password, done){
  try {
    // get user
    const user = await userService.getUserByUsername(username);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // check password match
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return done(null, false, {message: 'Incorrect password'});
    }
    // return user in passportjs expected format for serialization
    return done(null, user);
  } 
  catch (err) {
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
