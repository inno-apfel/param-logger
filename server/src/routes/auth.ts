import { Router } from 'express'
import passport from '../config/passport'
import bcrypt from "bcryptjs";
import userService from '../services/users'

const router = Router()

router.get('/me', (req, res, next) => {
  if (req.isAuthenticated()){
    res.json({
      success: true,
      user: req.user})
  }
  else{
    res.json({
    success: false,
    user: null})
  }
  
})

// send form
router.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err: any, user: Express.User | false, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info.message || 'Login failed' });

    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.status(200).json({ success: true, user });
    });

  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/signup', async function(req, res, next) {
  try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // copy of createUser from controllers/users
      const newUser = await userService.createUser(req.body.username, hashedPassword);

       req.login(newUser, (err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, newUser });
      });
      
  }
  catch(err) {
      return next(err);
  }
});

export default router