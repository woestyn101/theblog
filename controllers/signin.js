const router = require('express').Router();


router.get('/signin', (req, res) => {
    res.render('signin');
});



module.exports = router;