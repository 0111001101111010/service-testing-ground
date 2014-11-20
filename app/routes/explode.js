var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GIF Time' });
});

router.post('/', function (req,res) {
  res.redirect('back');
});

module.exports = router;
