import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors"; 
import session from "express-session";

export interface User {
  fname: string;
  lname: string;
}

interface LoginBody {
  uname?: string;
  password?: string;
}

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
  }
}

const app = express();

let users: User[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next();
});

app.use(
  session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", cors());

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: [fname, lname]
 *       properties:
 *         fname:
 *           type: string
 *           example: John
 *         lname:
 *           type: string
 *           example: Doe
 */

/**
 * @openapi
 * /users-api:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The full list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get("/users-api", (_req: Request, res: Response) => {
  res.json(users);
});

/**
 * @openapi
 * /users-api:
 *   post:
 *     summary: Add a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.post("/users-api", (req: Request<object, User[], User>, res: Response) => {
  users.push(req.body);
  res.json(users);
});

/**
 * @openapi
 * /users-api/{fname}:
 *   delete:
 *     summary: Delete a user by first name
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: fname
 *         required: true
 *         schema:
 *           type: string
 *         description: First name of the user to remove
 *     responses:
 *       200:
 *         description: The remaining users after deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.delete("/users-api/:fname", (req: Request, res: Response) => {
  const { fname } = req.params;
  users = users.filter((person) => person.fname !== fname);
  res.json(users);
});

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [uname, password]
 *             properties:
 *               uname:
 *                 type: string
 *                 example: bobbyc
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Authentication result (as plain text)
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: You are authenticated
 */
app.post("/login", (req: Request<object, string, LoginBody>, res: Response) => {
  if (req.body.uname === "bobbyc" && req.body.password === "12345") {
    req.session.authenticated = true;
    res.send("You are authenticated");
  } else {
    res.send("You are not authenticated");
  }
});

export default app;
