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

const app = express();
const port = 8080;

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
