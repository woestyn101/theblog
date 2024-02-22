const router = require('express').Router();
const path = require('path');

// This is the 'get' route 
router.get('/logout', async (req, res) => {
  res.render('logout');
});

module.exports = router;