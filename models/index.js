// import models
const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

// Blogpost belongsTo User

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',

  });

Comment.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
})

User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})


    module.exports = {
        User,
        Blogpost,
       Comment,
       
      };