import express, { Request, Response, NextFunction } from 'express';
import serveIndex from 'serve-index';
import upload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

import { helpers } from './db';

(async () => {
    await helpers.init();
})();

const app = express();

interface User {
    _id?: string;
    name: string;
    age: number;
}

// Middleware
const options = {
    extension: 'html',
    index: 'myfile.html',
};
app.use(express.static('pub_html', options));

app.use('/files', serveIndex('pub_html/files', { icons: true }));

// Logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// API endpoints

app.get('/users-api', async (req: Request, res: Response) => {
    const users = await helpers.findAll();
    res.json(users);
});

app.post('/users-api', async (req: Request<{},{},User>, res: Response) => {
    const newUser = req.body;
    await helpers.insertUser(newUser);
    res.status(201).json(newUser);
});

app.delete('/users-api/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    await helpers.deleteUser(String(userId));
    res.json({ message: `User deleted` });
});

// Templating
app.set('views', './views');
app.set('view engine', 'ejs');

// 404

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
