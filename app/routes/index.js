var express = require('express');
var router = express.Router();
var clock = require('./clock.js');
var moment = require('moment');

/* GET home page. */
console.log(moment().format());
router.get('/', function(req, res) {
  //console.log(clock());
  res.render('clock', { title: 'The Time is', image: clock(), time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") });
});

module.exports = router;
