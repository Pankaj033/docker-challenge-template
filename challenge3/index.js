const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(express.json());

app.get('/api/books', (req, res) => {
  connection.query('SELECT * FROM books', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM books WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
