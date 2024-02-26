const router = require('express').Router();
const path = require('path');

// This is the 'get' route 
router.get('/', async (req, res) => {
  res.render('home');
});

router.get('/signin', async (req, res) => {
  res.render('signin');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});


router.get('/logout', async (req, res) => {
  res.render('logout');
});



module.exports = router;