import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import boardRoutes from './api/boards';
import taskRoutes from './api/tasks';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Kanban Task Manager API');
});

// API Routes
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});