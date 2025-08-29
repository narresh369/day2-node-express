// server.mjs (or set "type": "module" in package.json)
import express from 'express';

const app = express();
const PORT = 3000;
const HOST = 'localhost';//localhost

// Middleware to parse JSON
app.use(express.json());
//It tells Express to automatically parse incoming JSON data from the request body.

// Basic route - http://localhost:3000 - test
app.get('/', (req, res) => {
    res.send('Welcome to Day 2: Node.js + Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//node index.js
//nodemon index.js
//nodemon index-basic.js
//npm run dev
