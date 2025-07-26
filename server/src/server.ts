import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth';
import tankRouter from './routes/tanks';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();
const port = process.env.PORT || 8080;

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

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
