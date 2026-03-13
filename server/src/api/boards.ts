import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// GET all boards
router.get('/', async (req: Request, res: Response) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});

// GET one board by ID with columns and tasks
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      columns: {
        orderBy: { order: 'asc' },
        include: {
          tasks: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  res.json(board);
});

// POST create a new board
router.post('/', async (req: Request, res: Response) => {
  const { title, ownerId } = req.body;
  const newBoard = await prisma.board.create({
    data: { 
      title, 
      ownerId, 
      columns: {
        create: [
          { title: 'To Do', order: 0 },
          { title: 'In Progress', order: 1 },
          { title: 'Done', order: 2 },
        ]
      }
    },
  });
  res.status(201).json(newBoard);
});

export default router;