import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Simple middleware example (logs each request)
app.use((req, res, next) => {
    console.log('MIDDLEWARE IN ACTION');
    console.log(`${req.method} ${req.url}`);
    next();//COMMENT THIS LINE TO STOP THE REQUEST FROM GOING FURTHER - FOR TESTING PURPOSES
});

// In-memory tasks array
let tasks = [
    { id: 1, title: "Learn Node.js" },
    { id: 2, title: "Build a Task API" }
];

// Routes

// Welcome route - http://localhost:5000/
app.get("/", (req, res) => {
    res.send("Welcome to Day 2: Node.js + Express (ES6)!");
});

// GET all tasks - http://localhost:5000/tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET task by ID - http://localhost:5000/tasks/1
//http://localhost:5000/tasks/2
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
});

// POST - Add new task - http://localhost:5000/tasks
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT - Update task
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    task.title = req.body.title || task.title;
    res.json(task);
});

// DELETE - Remove task
app.delete("/tasks/:id", (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
