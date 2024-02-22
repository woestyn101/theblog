const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    u_id: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      notNull: true,
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [8],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
  }
);

module.exports = User;
