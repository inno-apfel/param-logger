import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));


app.get('/api', (req: Request, res: Response) => {
  res.json({"params": ["alk", 'cal', "mag"]});
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});