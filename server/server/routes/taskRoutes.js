const express = require('express');
const router = express.Router();

// In-memory array to simulate a database (temporary)
let tasks = [];

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Title and dueDate are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    dueDate,
    createdAt: new Date().toISOString(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
