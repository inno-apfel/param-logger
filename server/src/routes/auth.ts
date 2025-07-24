import bcrypt from 'bcryptjs';
import {
  Request, 
  Response, 
  NextFunction,
  Router
} from 'express';

import passport from '../config/passport';
import userService from '../services/users';

const router = Router();

router.get('/me', (req: Request, res: Response) => {
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
});

router.post('/login/password', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: any, user: Express.User | false, info: any) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({success: false, message: info.message || 'Login failed'});

      req.logIn(user, err => {
        if (err) return next(err);
        return res.status(200).json({success: true, user});
      });
    },
  )(req, res, next);
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
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
});

export default router;
