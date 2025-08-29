import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
//It tells Express to automatically parse incoming JSON data from the request body.

// Basic route - http://localhost:5000
app.get('/', (req, res) => {
    res.send('Hello from express server!');
});

//http://localhost:5000/myendpoint
app.get('/myendpoint', (req, res) => {
    res.send('This is my end point!');
});

//http://localhost:5000/anotherep?x=10&y=5
app.get('/anotherep', (req, res) => {
    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (isNaN(x) | isNaN(y)) {
        return res.status(400).send('Please provide valid numbers for x and y');
    }

    const sum = x + y;
    res.send(`The sum of ${x} and ${y} is ${sum}`);
});

//http://localhost:5000/add?x=10&y=5
app.get('/add', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);

    if (isNaN(x) || isNaN(y)) {
        return res.status(400).send(`<h2 style="color: red;">Invalid input: x and y must be numbers</h2>`);
    }

    const sum = x + y;

    res.send(`
        <html>
            <head>
                <title>Sum Result</title>
            </head>
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px; background-color: #f0f8ff;">
                <div style="display: inline-block; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; background-color: #ffffff;">
                    <h1 style="color: #4CAF50;">Addition Result</h1>
                    <p style="font-size: 20px;">The sum of <strong>${x}</strong> and <strong>${y}</strong> is:</p>
                    <h2 style="color: #2196F3;">${sum}</h2>
                </div>
            </body>
        </html>
    `);
});

//Create an endpoint in Express JS that takes
// 3 numbers x,y,z as query strings and return their Product.
//http://localhost:5000/multiply?x=2&y=3&z=4

app.get('/multiply', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    const z = parseFloat(req.query.z);

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
        return res.status(400).send(`
            <h2 style="color: red; font-family: Arial;">Invalid input: x, y, and z must be valid numbers</h2>
        `);
    }

    const product = x * y * z;

    res.send(`
        <html>
            <head>
                <title>Multiplication Result</title>
            </head>
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px; background-color: #f0fff0;">
                <div style="display: inline-block; padding: 20px; border: 2px solid #FF9800; border-radius: 10px; background-color: #ffffff;">
                    <h1 style="color: #FF9800;">Multiplication Result</h1>
                    <p style="font-size: 20px;">
                        The product of <strong>${x}</strong>, <strong>${y}</strong>, and <strong>${z}</strong> is:
                    </p>
                    <h2 style="color: #4CAF50;">${product}</h2>
                </div>
            </body>
        </html>
    `);
});


app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});

/*
cors() is a middleware function that enables Cross-Origin Resource Sharing.
It allows requests from other origins like http://localhost:5173 (your React frontend) 
to access your Express backend (http://localhost:5000).*
*/