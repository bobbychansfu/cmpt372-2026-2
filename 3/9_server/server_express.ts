import express, { Request, Response, NextFunction } from 'express';
import serveIndex from 'serve-index';

const app = express();

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [];

// Middleware
const options = {
    extension: 'html',
    index: 'myfile.html',
};
app.use(express.static('pub_html', options));

app.use('/files', serveIndex('pub_html/files', { icons: true }));

// logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api-key check
// app.use((req: Request, res: Response, next: NextFunction) => {
//     const apiKey = req.headers['x-api-key'];
//     if (apiKey === 'secret123') {
//         console.log('API key valid');
//         next();
//     } else {
//         console.log('API key missing or invalid');
//         res.status(401).json({ error: 'Unauthorized' });
//     }
// });


// API endpoints

app.get('/users-api', (req: Request, res: Response) => {
    res.json(users);
});

app.post('/users-api', (req: Request<{},{},User>, res: Response) => {
    users.push(req.body);
    res.status(201).json(users);
});

// templating
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/users', (req: Request, res: Response) => {

    res.render('users', {
        users: users,
        timestamp: new Date().toLocaleString(),
        totalUsers: users.length
    });
});

// 404

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});