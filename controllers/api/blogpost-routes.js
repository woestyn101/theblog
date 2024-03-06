const router = require('express').Router();

// importing models from sequelize
const { User, Blogpost, Comment } = require('../../models');

// access page with authentication
const withAuth = require('../../utils/auth');

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

  // Use withAuth middleware to prevent access to route
  router.get('/:id', withAuth, async (req, res) => {
    try {
      const blogPostData = await Blogpost.findByPk(req.params.id, {
        include: [
          {
            model: User,
           // attributes: ['name'],
          },
        ],
      });
  
     // serialized the data
      const blogposts = blogPostData.get({ plain: true });
  

        // render page and send variable
      res.render('blogpost', {
        ...blogposts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //delete route with authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        bp_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates  post on its id
router.put('/update/:id', (req, res) => {
  // Calls the update method on the Blogpost model
  Blogpost.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.update_title,
      p_content: req.body.update_post,
      },
    {
      // Gets the post based on the id given in the request parameters
      where: {
        bp_id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      // Sends the updated post as a json response
      res.json(updatedPost);
    })
    .catch((err) => res.json(err));
});

// Use withAuth middleware to prevent access to route
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
         // attributes: ['name'],
        },
      ],
    });

   // serialized the data
    const blogposts = blogPostData.get({ plain: true });


      // render page and send variable
    res.render('update', {
      ...blogposts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;