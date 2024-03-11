const router = require('express').Router();

//importing models from sequelize
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
        res.status(200).json(newUser);
      })
      .catch((err) => {
        if(err.name === "SequelizeUniqueConstraintError"){
          res.status(400).json({error: err, message:"Username already exists, please try a different username."});
        }else{
          res.status(400).json({error: err, message:"Unable to create a user!"});
        }
      });
  });

  // signin page

  router.post('/signin', async (req, res) => {
    try {

      // look for user in database
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

     //check for password
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

     // setting up the session and creating session variables
      req.session.save(() => {
        req.session.user_id = userData.u_id;
        req.session.username = userData.username;        
        req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // logging out the user and destroying the session
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

 
  
module.exports = router;