const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    c_id: {
      type: DataTypes.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
      c_content: {
        type: DataTypes.TEXT,
        notNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          // This references the `User` model, which we set in `User.js` as its `modelName` property
          model: 'users',
          key: 'u_id',
        },
       
      },
      blogpost_id: {
        type: DataTypes.INTEGER,
        references: {
          // This references the `Blogpost` model, which we set in `Blogpost.js` as its `modelName` property
          model: 'blogposts',
          key: 'bp_id',
        },
       
      }
      
      
     
   
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comment;
