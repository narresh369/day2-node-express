// server.mjs (or set "type": "module" in package.json)
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple middleware example (logs each request)
/* app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // move to next handler
}); */

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Day 2: Node.js + Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
