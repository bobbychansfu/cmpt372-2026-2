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
    id: number;
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

// logging
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
    // Here you would typically insert the new user into the database
    // For now, we'll just push it to the array (in a real app, this would be replaced with a database insert)
    await helpers.insertUser(newUser);
    res.status(201).json(newUser);
});

app.delete('/users-api/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    await helpers.deleteUser(String(userId));
    res.json({ message: `User deleted` });
});

// file upload

app.use(upload());

app.post('/upload', async (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const myImage = req.files.myImage;
    const file = Array.isArray(myImage) ? myImage[0] : myImage;
    const data = file.data;
    // fs.writeFileSync(path.join(__dirname, 'pub_html/files', file.name), data);
    await helpers.addFile(data);
    res.json({ message: 'File uploaded successfully', filename: file.name });
});

app.get('/image', async (req: Request, res: Response) => {
    const imageData = await helpers.getImage();
    res.setHeader('Content-Type', 'image/png');
    res.send(imageData);
});


// templating
app.set('views', './views');
app.set('view engine', 'ejs');

// app.get('/users', (req: Request, res: Response) => {

//     res.render('users', {
//         users: users,
//         timestamp: new Date().toLocaleString(),
//         totalUsers: users.length
//     });
// });

// 404

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});