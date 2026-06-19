import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: "postgresql://postgres:root@localhost/postgres",
});

export interface User {
  id: number;
  name: string;
  age: number;
}

export const helpers = {

  findAll: async (): Promise<User[]> => {
    const q = `SELECT * FROM users ORDER BY id`;
    const result: QueryResult<User> = await pool.query(q);
    return result.rows;
  },

  findById: async (id: number): Promise<User | null> => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const result: QueryResult<User> = await pool.query(q, [id]);
    return result.rows[0] || null;
  },

  addUser: async (name: string, age: number): Promise<User> => {
    const q = `INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *`;
    const result: QueryResult<User> = await pool.query(q, [name, age]);
    return result.rows[0];
  },

  deleteById: async (id: number): Promise<void> => {
    const q = `DELETE FROM users WHERE id = $1`;
    await pool.query(q, [id]);
  },

  init: async (): Promise<void> => {
    const q = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      age INT NOT NULL
    )`;
    await pool.query(q);
  },

  close: async (): Promise<void> => {
    await pool.end();
  },
};
