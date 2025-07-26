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
    const {password_hash, ...safeUser} = req.user;
    res.json({
      success: true,
      user: safeUser,
    });
  } else {
    res.json({
      success: false,
      user: null,
    });
  }
};

export async function loginWithPassword(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
        'local',
        (err: any, user: Express.User | false, info: any) => {
            if (err) return next(err);
            if (!user)
                return res.status(401).json({success: false, message: info.message || 'Login failed'});
            req.logIn(user, err => {
                if (err) return next(err);
                return res.status(200).json({success: true, user});
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
        if (err) return next(err);
        res.status(200).json({success: true, newUser});
        });
    } catch (err) {
        return next(err);
    }
};
