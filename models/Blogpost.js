// importing Model and datatypes from sequelize
const { Model, DataTypes } = require('sequelize');

// importing connection to database
const sequelize = require('../config/connection');

// creating the Blogpost Model
class Blogpost extends Model {}

Blogpost.init(
  {
    bp_id: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
     notNull: true,
    },
    p_content: {
        type: DataTypes.TEXT,
        notNull: true,
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        // This references the `User` model, which we set in `User.js` as its `modelName` property
        model: 'users',
        key: 'u_id',
      },
      
    }
      
     
   
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogposts',
  }
);

module.exports = Blogpost;
