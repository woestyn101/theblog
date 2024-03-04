const router = require('express').Router();

const { User, Blogpost, Comment } = require('../../models');
// CREATE a user
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
  
      const blogposts = blogPostData.get({ plain: true });
  
      res.render('blogpost', {
        ...blogposts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;