const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const blogpostRoutes = require('./blogpost-routes');



// When we have localhost:8001/api/users
router.use('/users', userRoutes);
// When we have localhost:8001/api/blogposts
router.use('/blogpost', blogpostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
