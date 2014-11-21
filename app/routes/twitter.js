var express = require('express');
var router = express.Router();
var fs = require('fs');
var Canvas = require('canvas');
var im = require('imagemagick');
var Promise = require("bluebird");

var twitter = require('twitter');
var util = require('util');
var tConfig = require('../config/twitter.json');
var twit = new twitter(tConfig);
//refactor as promise later
/* GET home page. */
// router.get('/', function(req, res) {
//
//   //refactor with bluebird later
//   twit.search('@stanzheng', function(data) {
//     console.log(util.inspect(data.statuses));
//      res.render('twitter',
//        { title: 'GIF This',
//          image: 'http://placehold.it/200x200',
//          tweets: data.statuses
//      });
//   });
// });

router.get('/', function (req,res) {
    //create a white background
    var top, bottom, img;
    top = req.body.top;
    bottom = req.body.bottom;
    //create image reader
    Image = Canvas.Image;
    img = new Image;
    //read in the image
    img.src = fs.readFileSync(__dirname + '/myself.jpg');

    //edit canvas size
    canvas = new Canvas(300,300);
    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Impact';
    ctx.fillText(top, 50, 50);
    ctx.fillText(bottom, 50, 240);

    var te = ctx.measureText(top);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 52);
    ctx.lineTo(50 + te.width, 52);
    ctx.stroke();


//console.log('<img src="' + canvas.toDataURL() + '" />');
  res.render('index', { title: 'GIF This', image: canvas.toDataURL()});
  //res.redirect('back');
  //refactor with bluebird later
  twit.search('@stanzheng', function(data) {
    console.log(util.inspect(data.statuses));
     res.render('twitter',
       { title: 'GIF This',
         image: 'http://placehold.it/200x200',
         tweets: data.statuses
     });
  });
});

module.exports = router;
