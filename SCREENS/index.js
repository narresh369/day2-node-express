import express from 'express';

const app = express();
app.use(express.json());
const PORT = 5000;

// Root endpoint
// http://localhost:5000
app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!');
});

// Custom endpoint 1
// http://localhost:5000/myendpoint
app.get('/myendpoint', (req, res) => {
  res.send('Hello World this is mine!');
});

// Custom endpoint 2
// http://localhost:5000/testep
app.get('/testep', (req, res) => {
  res.send('Test End Point!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
