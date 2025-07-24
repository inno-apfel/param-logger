import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth';
import userRouter from './routes/users';
import tankRouter from './routes/tanks';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(
  session({
    secret: 'ocellaris',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      sameSite: 'lax',
    },
  }),
);

app.use('/users', userRouter);
app.use('/tanks', tankRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
