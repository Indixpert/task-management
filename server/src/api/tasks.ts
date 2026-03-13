import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// POST create a new task
router.post('/', async (req: Request, res: Response) => {
  const { title, columnId, order } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { title, columnId, order },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Could not create task' });
  }
});

// PUT update a task (e.g., move between columns)
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, columnId, order } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, columnId, order },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE a task
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
});

export default router;