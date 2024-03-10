const router = require('express').Router();

// importing models from sequelize
const { User, Blogpost, Comment } = require('../../models');

// access page with authentication
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    //console.log("add blog route");
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    Comment.create({
      c_content: req.body.yourcomment,
      user_id: req.session.user_id,
      blogpost_id: req.body.bp_id
         })
      .then((newComment) => {
        // Send the newly created row as a JSON object
        res.json(newComment);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get('/', async (req, res) => {
  
    try {
      // Get all posts and JOIN with user data
      const commentPostData = await Comment.findAll({
        include: [User, Blogpost],
      });
  
      // Serialize data so the template can read it
      const commentposts = commentPostData.map((commentpost) => commentpost.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('all_comments', { 
        commentposts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  
    
  });

module.exports = router;