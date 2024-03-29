const router = require('express').Router();
const path = require('path');

// importing the models from sequelize
const { User, Blogpost, Comment } = require('../models');



// This is the 'get' route 
router.get('/', async (req, res) => {
  
  try {
    // Get all posts and JOIN with user data
    const blogPostData = await Blogpost.findAll({
      include: [User, Comment],
    });

    // Serialize data so the template can read it
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
    console.log(blogposts);

    // Pass serialized data and session flag into template
    res.render('home', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }

  
});

// signin page
router.get('/signin', async (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signin');
 
});

// signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});




// logout page

router.get('/logout', async (req, res) => {

  try {
    // Get all projects and JOIN with user data
    const blogPostData = await Blogpost.findAll({
      include: [User],
    });

    // Serialize data so the template can read it
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      blogposts, 
      //logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
 // res.render('home');
});

// setting up the dashboard to get id from user
// and show use posts

router.get('/dashboard/:id', async (req, res) => {
  try {
    const projectData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
         // attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('dashboard', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;