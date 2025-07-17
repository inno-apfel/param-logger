import passport from 'passport'
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import userService from '../services/users'
import bcrypt from 'bcryptjs';
import { User } from '../generated/prisma';

const verifyPassword: VerifyFunction = async (username, password, done) => {
    try {
      const user = await userService.getUser(username)
      if (!user) {
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(password, user.password_hash);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  } 

passport.use(
  new LocalStrategy(verifyPassword)
);

passport.serializeUser((user, done) => {
  done(null, (user as User).username);
});

passport.deserializeUser(async (username: string, done) => {
  try {
    const user = await userService.getUser(username)
      if (!user) {
        throw new Error("User not found");
      }

    done(null, user);
  } catch(err) {
    done(err);
  }
});

export default passport;