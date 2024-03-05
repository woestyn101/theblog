const router = require('express').Router();

// importing paths to routes
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const blogpostRoutes = require('./blogpost-routes');



// When we have localhost:3005/api/users
router.use('/users', userRoutes);
// When we have localhost:3005/api/blogpost
router.use('/blogpost', blogpostRoutes);

// When we have localhost:3005/api/comment
router.use('/comment', commentRoutes);

module.exports = router;
