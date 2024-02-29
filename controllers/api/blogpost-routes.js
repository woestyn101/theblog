const router = require('express').Router();

const { User, Blogpost, Comment } = require('../../models');
// CREATE a user

router.post('/', (req, res) => {
    console.log("add blog route");
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    Blogpost.create({
      title: req.body.title,
      p_content: req.body.userPost,
      user_id: req.session.user_id
         })
      .then((newPost) => {
        // Send the newly created row as a JSON object
        res.json(newPost);
      })
      .catch((err) => {
        res.json(err);
      });
  });


module.exports = router;