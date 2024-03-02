const router = require('express').Router();
const path = require('path');
const withAuth = require('../utils/auth');

// This is the 'get' route 
router.get('/', withAuth, async (req, res) => {
  res.render('dashboard');
});

module.exports = router;