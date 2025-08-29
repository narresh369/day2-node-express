// server.mjs (or set "type": "module" in package.json)
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route - http://localhost:3000
app.get('/', (req, res) => {
    res.send('Welcome to Day 2: Node.js + Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
