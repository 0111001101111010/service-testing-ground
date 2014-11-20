var express = require('express');
var router = express.Router();

var Canvas = require('canvas');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GIF This', image: 'http://placehold.it/200x200' });
});

router.post('/', function (req,res) {

    Image = Canvas.Image;
    canvas = new Canvas(200,200);
    ctx = canvas.getContext('2d');
    ctx.font = '30px Impact';
    ctx.rotate(1/10);
    ctx.fillText("True!", 50, 100);

    var te = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();

console.log('<img src="' + canvas.toDataURL() + '" />');
  res.render('index', { title: 'GIF This', image: canvas.toDataURL()});
  //res.redirect('back');
});

module.exports = router;
