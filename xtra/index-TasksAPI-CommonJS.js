const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple middleware example (logs each request)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // move to next handler
});

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Day 2: Node.js + Express!');
});

//------------------------ TASKS RELATED END-POINTS ----------------------------------

let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Practice Express", completed: false }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET single task by id
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});

// POST create new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted successfully' });
});

//------------------------ TASKS RELATED END-POINTS ----------------------------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
/*
# Task Manager API
GET
http://localhost:3000/tasks
http://localhost:3000/tasks/1
http://localhost:3000/tasks/2

POSTMAN - Install Postman and test below end-points
POST
http://localhost:3000/tasks
body:
{ "title": "New task" }

PUT
http://localhost:3000/tasks/1
{
  "title": "Updated task title",
  "completed": true
}

DELETE
http://localhost:3000/tasks/1


## Routes
- `GET /tasks` → Get all tasks
- `GET /tasks/:id` → Get task by ID
- `POST /tasks` → Add a new task (JSON: `{ "title": "New task" }`)
- `PUT /tasks/:id` → Update task by ID
- `DELETE /tasks/:id` → Delete task by ID

*/