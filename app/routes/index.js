var express = require('express');
var router = express.Router();
var clock = require('./clock.js');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
  //console.log(clock());
  res.render('clock', {
     title: 'the time is',
     image: clock(),
     time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a").toString()
  });
});

module.exports = router;
