import bcrypt from 'bcryptjs';
import {
  Request, 
  Response, 
  NextFunction
} from 'express';

import passport from '../config/passport';
import userService from '../services/users';

export async function checkUserAuthentication(req: Request, res: Response) {
  if (req.isAuthenticated()) {
    // remove password_hash from being sent to client
    const {password_hash, ...safeUser} = req.user;
    res.json(safeUser);
  } else {
    res.status(401).send('User not authenticated');
  }
};

export async function loginWithPassword(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
        'local',
        (err: Error, user: Express.User | false, info: any) => {
            if (err) { 
              return next(err); 
            }
            if (!user) {
              return res.status(401).send(info.message);
            }
            req.logIn(user, err => {
                if (err) {
                  return next(err);
                }
                return res.status(200).json('user');
            });
        },
    )(req, res, next);
};

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export async function signupNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userService.createUser(
      req.body.username,
      hashedPassword,
    );

    req.login(newUser, err => {
      if (err) { 
        return next(err);
      }
      res.status(200).json(newUser);
    });
  } catch (err) {
    next(err)
  }
};
