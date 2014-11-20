var express = require('express');
var router = express.Router();

/* GET users listing. */
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var s3 = require('s3');
var fs = require('fs');
var config = require('../config/s3config.json');
var s3Stream = require('s3-upload-stream')(new AWS.S3());
/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */

// Set your region for future requests.

//AWS.config.
//AWS.config.region = 'us-east-1';

//console.log(process.env);

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
    //"region": "sa-east-1"   <- If you want send something to your bucket, you need take off this settings, because the S3 are global.
});

function upload(myKey,myBody){
  // Create a bucket using bound parameters and put something in it.
  // Make sure to change the bucket name from "myBucket" to something unique.
  var s3bucket = new AWS.S3({params: {Bucket: 'stanzheng-staging'}});
  s3bucket.createBucket(function() {
     var data = {Key: myKey, Body: myBody };
    // s3bucket.getSignedUrl('getObject', data, function(err, url){
    //   console.log('the url of the image is', url);
    // });
    s3bucket.putObject(data, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
      }
    });
  });
}
//...
router.post('/', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            upload("image.jpg",fstream);
            res.redirect('back');
        });
    });
});


router.get('/', function(req, res) {
  res.render('uploads', {});
});

module.exports = router;
