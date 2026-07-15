import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';


// Types

interface User {
  username: string;
  password: string; // NOTE: plaintext for demo only — hash in real apps (bcrypt)
  name: string;
}

// Augment express-session so req.session.user is strongly typed.
declare module 'express-session' {
  interface SessionData {
    user?: { username: string; name: string };
  }
}

// Fake user "database"

const users: User[] = [
  { username: 'bobby', password: 'cmpt372', name: 'Bobby Chan' },
  { username: 'ada', password: 'cmpt372', name: 'Ada Lovelace' },
];

const app = express();
const PORT = process.env.PORT ?? 3001;


// Middleware

app.use(express.json());

// Important! Allow the React dev server to send the session cookie.
app.use(
  cors({
    origin: 'http://localhost:5173', // replace with your React dev server origin
    credentials: true, // required so the browser sends/accepts the session cookie
  })
);

app.use(
  session({
    name: 'session',
    secret: 'secret string', // use an env var in production
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, // 30 minutes
    },
  })
);


// Auth guard — checks for a valid session

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
}

// POST /login  { username, password }
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  // database call
  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Store only non-sensitive info in the session.
  req.session.user = { username: found.username, name: found.name };
  return res.json({ user: req.session.user });
});

// POST /logout — destroy the session
app.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.clearCookie('session');
    return res.json({ ok: true });
  });
});

// GET /me — protected: returns the current logged-in user
app.get('/me', isLoggedIn, (req: Request, res: Response) => {
  return res.json({ user: req.session.user });
});

app.get('/anotherprotectedroute', isLoggedIn, (req: Request, res: Response) => {
  return res.json({ message: 'This is another protected route' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
