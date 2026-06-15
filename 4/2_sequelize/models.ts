// ==========================
// Sequelize Model Definition

import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
  declare id: number;
  declare name: string;
  declare age: number;
}

// Map the User class to the "users" table.
export const defineUserModel = (sequelize: Sequelize): typeof User => {
  // The `init()` method defines the columns and their types
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false, // skip createdAt/updatedAt columns for this simple demo
    }
  );

  return User;
};
