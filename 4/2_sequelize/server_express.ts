import express, { Request, Response, NextFunction } from 'express';
import { helpers } from './db';

// Initialize the database (create the "users" table if it doesn't exist).
// This now calls sequelize.sync() under the hood - see db.ts.
(async () => {
  await helpers.init();
})();

interface User {
  name: string;
  age: number;
}

const app = express();
const PORT = process.env.PORT ?? 3000; // Use PORT env var if set, otherwise default to 3000


// MIDDLEWARE - app.use()

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// API ENDPOINTS 

// GET all users
app.get('/users-api', async (_req: Request, res: Response) => {
  console.log('...getting all users');
  const users = await helpers.findAll();
  res.json(users);
});

// GET a single user by id (findByPk)
app.get('/users-api/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await helpers.findById(id);
  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }
  res.json(user);
});

// POST a new user (create)
app.post('/users-api', async (req: Request<{}, {}, User>, res: Response) => {
  const user = await helpers.addPerson(req.body.name, req.body.age);
  res.status(201).json(user);
});

// PUT update an existing user (update)
app.put('/users-api/:id', async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updated = await helpers.updatePerson(id, req.body);
  if (!updated) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }
  res.json(updated);
});

// DELETE a user by id (destroy)
app.delete('/users-api/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await helpers.deleteById(id);
  res.json({ message: `User with ID ${id} deleted` });
});

// 404
app.use((req: Request, res: Response) => {
  console.log('404 handler reached');
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
