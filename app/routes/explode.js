var express = require('express');
var router = express.Router();

var Canvas = require('canvas');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GIF This', image: 'http://placehold.it/200x200' });
});

router.post('/', function (req,res) {
    var top, bottom;
    top = req.body.top;
    bottom = req.body.bottom;
    Image = Canvas.Image;
    canvas = new Canvas(400,200);
    ctx = canvas.getContext('2d');
    ctx.font = '24px Impact';
    ctx.fillText(top, 50, 50);
    ctx.fillText(bottom, 50, 150);

    var te = ctx.measureText(top);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 52);
    ctx.lineTo(50 + te.width, 52);
    ctx.stroke();

console.log('<img src="' + canvas.toDataURL() + '" />');
  res.render('index', { title: 'GIF This', image: canvas.toDataURL()});
  //res.redirect('back');
});

module.exports = router;
