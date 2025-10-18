import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth';
import userRouter from './routes/users';
import tankRouter from './routes/tanks';
import observationRouter from './routes/observations';
import uploadRouter from './routes/uploads';
import globalErrorHandler from './middlewares/globalErrorHandler';

import swaggerDocs from '../docs/swagger';

import dotenv from 'dotenv'

dotenv.config()

const isProd = process.env.NODE_ENV === 'production';

const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);

app.use(cors({
  origin: isProd 
    ? [`https://${process.env.CLIENT_URL}`, `https://www.${process.env.CLIENT_URL}`] 
    : [String(process.env.CLIENT_URL)],
  credentials: true
}));

app.use(session({
  secret: 'ocellaris',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,                   // true in production, false in dev
    sameSite: isProd ? 'none' : 'lax' // cross-site in prod, relaxed in dev
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/tanks', tankRouter)
app.use('/observations', observationRouter)
app.use('/upload', uploadRouter)
app.get('/', async (req: Request, res: Response) => {
  res.send('OK')
});
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  swaggerDocs(app, port);
});