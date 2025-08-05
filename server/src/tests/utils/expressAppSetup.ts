import cors from 'cors';
import express, { 
    Request, 
    Response 
} from 'express';
import session from 'express-session';
import passport from 'passport';

import globalErrorHandler from '../../middlewares/globalErrorHandler';
import authRouter from '../../routes/auth';
import tankRouter from '../../routes/tanks';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(session({
  secret: 'ocellaris',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true in production with HTTPS
    sameSite: 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/tanks', tankRouter)
app.use('/auth', authRouter)
app.get('/', async (req: Request, res: Response) => {
  res.send('OK')
});
app.use(globalErrorHandler)

export default app;