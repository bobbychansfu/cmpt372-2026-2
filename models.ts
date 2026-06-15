import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
  declare id: number;
  declare name: string;
  declare age: number;
}

export const defineUserModel = (sequelize: Sequelize): typeof User => {
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
      timestamps: false, 
    }
  );

  return User;
};
