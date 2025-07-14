import express, { Request, Response } from 'express';
import cors from 'cors';
import tankRouter from './routes/tanks';
import userRouter from './routes/users';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter)
app.use('/tanks', tankRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('home page')
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});