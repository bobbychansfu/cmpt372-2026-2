import { Pool } from 'pg';

const pool: Pool = new Pool({connectionString: 'postgresql://postgres:root@localhost:5432/cmpt372'});

interface User {
    id: number;
    name: string;
    age: number;
}

const helpers = {
    findAll: async (): Promise<User[]> => {
        const q = 'SELECT * FROM users;';
        const { rows } = await pool.query(q);
        return rows;
    },

    insertUser: async (user: Omit<User, 'id'>): Promise<void> => {
        const q = 'INSERT INTO users (name, age) VALUES ($1, $2);';
        await pool.query(q, [user.name, user.age]);
    },

    deleteUser: async (id: string): Promise<void> => {
        const q = `DELETE FROM users WHERE id = ${id}`;
        await pool.query(q);
    },

    addFile: async (data: Buffer): Promise<void> => {
        const q = 'INSERT INTO pics (data) VALUES ($1);';
        await pool.query(q, [data]);
    },

    getImage: async (): Promise<Buffer[]> => {
        const q = 'SELECT * FROM pics;';
        const result = await pool.query(q);
        return result.rows[0].data;
    },

    init: async (): Promise<void> => {
        const q = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
    );`;
        await pool.query(q);
    },
};

export { helpers };