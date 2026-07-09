import express, { Request, Response } from 'express';
import { Pool } from 'pg';

// App must be defined before use
const app = express();
const PORT = 8080;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  password: 'root'
});

// static responses

app.get('/ep1', (req: Request, res: Response) => {
  res.send('Hello from endpoint 1!');
});

app.get('/ep2', (req: Request, res: Response) => {
  res.send('Hello from endpoint 2!');
});

// apis

app.get('/', async (req: Request, res: Response) => {
  console.log(req.method);
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (pid serial, fname varchar(20), lname varchar(20), age integer)`);
    res.send("success!");
  } catch (e) {
    res.end(String(e));
  }
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (e) {
    res.end(String(e));
  }
});

app.post('/users', async (req: Request, res: Response) => {
  const { fname, lname, age } = req.body;
  try {
    await pool.query(`INSERT INTO users (fname, lname, age) VALUES ($1, $2, $3)`, [fname, lname, age]);
    res.send("User added successfully!");
  } catch (e) {
    res.end(String(e));
  }
});

app.listen(PORT, '0.0.0.0');
console.log(`Running on http://0.0.0.0:${PORT}`);
