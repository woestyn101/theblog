const router = require('express').Router();
const path = require('path');

// This is the 'get' route 
router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;