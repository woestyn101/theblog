const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
// CREATE a user
router.post('/', (req, res) => {
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    User.create({
      username: req.body.username,
      password: req.body.password,
         })
      .then((newUser) => {
        // Send the newly created row as a JSON object
        res.json(newUser);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;