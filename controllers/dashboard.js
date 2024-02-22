const router = require('express').Router();
const path = require('path');

// This is the 'get' route 
router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

module.exports = router;