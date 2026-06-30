import express, { Request, Response } from 'express';

const app = express();
const PORT = 8080;

app.get('/ep1', (req: Request, res: Response) => {
  res.send('Hello from /ep1');
});

app.get('/ep2', (req: Request, res: Response) => {
  res.send('Hello from /ep2');
});

app.use((req: Request, res: Response) => {
  console.log('404 handler reached');
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0');
console.log(`Server is running on http://localhost:${PORT}`);