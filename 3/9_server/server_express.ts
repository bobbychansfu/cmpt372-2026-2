import express, { Request, Response, NextFunction } from 'express';

const app = express();

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});