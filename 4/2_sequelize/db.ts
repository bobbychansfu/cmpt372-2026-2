// ============================================================================
// Database layer - Sequelize version
//
// Compare this file to 0_pg_express/db.ts, which implements the exact same
// `helpers` interface using raw `pg` queries. Everything that calls
// `helpers.*` (i.e. index.ts) does not need to change - only how each
// operation is implemented underneath changes.
// ============================================================================

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User, defineUserModel } from './models';

// Load DB_HOST / DB_PORT / DB_NAME / DB_USER / DB_PASSWORD from .env
// (see topic4-sequelize.pdf, slide 7: "Adding environment variables")
dotenv.config();

// Create the Sequelize connection. This replaces the `new Pool({...})` call
// from the pg version.
const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'cmpt372',
  process.env.DB_USER ?? 'postgres',
  process.env.DB_PASSWORD ?? 'root',
  {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: 'postgres',
    logging: false, // set to console.log to see the generated SQL for each call below
  }
);

// Attach the User model to this connection (slide 6's UserMap pattern).
defineUserModel(sequelize);

const helpers = {
  /**
   * Create the "users" table if it doesn't exist yet.
   * Sequelize's `sync()` reads the model definition and issues the
   * equivalent of `CREATE TABLE IF NOT EXISTS ...` for us.
   */
  init: async (): Promise<void> => {
    await sequelize.sync();
  },

  /**
   * Fetch all users from the database.
   * Equivalent to: SELECT * FROM users
   */
  findAll: async () => {
    return User.findAll();
  },

  /**
   * Fetch a single user by primary key.
   * Equivalent to: SELECT * FROM users WHERE id = $1
   */
  findById: async (id: number) => {
    return User.findByPk(id);
  },

  /**
   * Add a new user to the database.
   * Equivalent to: INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *
   */
  addPerson: async (name: string, age: number) => {
    return User.create({ name, age });
  },

  /**
   * Update an existing user's attributes.
   * Equivalent to: UPDATE users SET ... WHERE id = $1
   * Returns null if no user with that id exists.
   */
  updatePerson: async (
    id: number,
    updates: Partial<{ name: string; age: number }>
  ) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(updates);
    return user;
  },

  /**
   * Delete a user by ID.
   * Equivalent to: DELETE FROM users WHERE id = $1
   */
  deleteById: async (id: number): Promise<void> => {
    await User.destroy({ where: { id } });
  },

  /**
   * Close the database connection.
   */
  close: async (): Promise<void> => {
    await sequelize.close();
  },
};

export { helpers, sequelize };
