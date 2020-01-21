const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.send("we're getting routes!");
})

//GET skeleton route for getting user info
router.get('/user', function (req, res) {
  res.send("we are getting users!");
})

//POST skeleton route to post data to user table 
router.post('/user', function (req, res) {
  res.send("We received your user info");
})

//GET skeleton route for getting ONE band info
router.get('/band', function (req, res) {
  res.send("we are getting band!");
})

//POST skeleton route to post data to band table for ONE band
router.post('/band', function (req, res) {
  res.send("We received your band info");
})

//GET skeleton route for getting ONE show info
router.get('/show', function (req, res) {
  res.send("we are getting show!");
})

//POST skeleton route to post data ONE show table
router.post('/show', function (req, res) {
  res.send("We received your show info");
})

module.exports = router;