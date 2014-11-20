var express = require('express');
var router = express.Router();

/* GET users listing. */
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var s3 = require('s3');
var fs = require('fs');
var zlib = require("zlib");
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

function upload(path, myKey){
  // Create a bucket using bound parameters and put something in it.
  // Make sure to change the bucket name from "myBucket" to something unique.
    fs.readFile(path, function(err, file_buffer){
      var s3bucket = new AWS.S3({params: {Bucket: 'stanzheng-staging'}});
      s3bucket.createBucket(function() {
         var data = {Key: myKey, Body: file_buffer };
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
  });
}

function uploadStreams(myKey,myBody){
  var compress = zlib.createGzip();
  var payload = new s3Stream.upload({
    "Bucket": "stanzheng-staging",
    "Key": "testing"
  });

  // Optional configuration
  payload.maxPartSize(20971520); // 20 MB
  payload.concurrentParts(5);

  // Handle errors.
  payload.on('error', function (error) {
    console.log(error);
  });

  /* Handle progress. Example details object:
     { ETag: '"f9ef956c83756a80ad62f54ae5e7d34b"',
       PartNumber: 5,
       receivedSize: 29671068,
       uploadedSize: 29671068 }
  */
  payload.on('part', function (details) {
    console.log(details);
  });

  /* Handle upload completion. Example details object:
     { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
       Bucket: 'bucketName',
       Key: 'filename.ext',
       ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
  */
  payload.on('uploaded', function (details) {
    console.log(details);
  });

  // Pipe the incoming filestream through compression, and up to S3.
  myBody.pipe(compress).pipe(payload);
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
            upload(__dirname + '/files/' + filename, filename);
            res.redirect('back');
        });
    });
});


router.get('/', function(req, res) {
  res.render('uploads', {});
});

module.exports = router;
