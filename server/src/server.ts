import express, { Request, Response } from 'express';
import cors from 'cors';
import tankRouter from './routes/tanks';
import userRouter from './routes/users';
import authRouter from './routes/auth';

import session from "express-session";
import passport from "passport";

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

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
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter)
app.use('/tanks', tankRouter)
app.use('/auth', authRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('home page')
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});