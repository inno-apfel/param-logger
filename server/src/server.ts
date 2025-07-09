import express, { Request, Response } from 'express';
import cors from 'cors';
import * as userService from './services/users';
import prisma from './db/client';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));


app.get('/api', (req: Request, res: Response) => {

  userService.getAllUsers()
    .catch(e => {
      console.error(e.message)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })


  res.json({"params": ["alk", 'cal', "mag"]});
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});