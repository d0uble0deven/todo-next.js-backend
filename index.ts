import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', async (req, res) => {
      const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Create a task
app.post('/tasks', async (req, res) => {
    try {
      const { title, color } = req.body;
      const newTask = await prisma.task.create({
        data: {
          title,
          color,
          completed: false,
        },
      });
      res.json(newTask);
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Failed to add task' });
    }
  });
  

// Edit a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, completed },
        });
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


// Complete a task
app.put('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { completed },
      });
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.task.delete({ where: { id: Number(id) } });
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
  

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
