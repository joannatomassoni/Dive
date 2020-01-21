const express = require('express');
const router = express.Router();
const { getTypes } = require('./db/controllers/index');


router.get('/', function (req, res) {
  res.send("we're getting routes!");
})

//GET skeleton route for getting user info
router.get('/users', function (req, res) {
  res.send("we are getting users!");
})

//POST skeleton route to post data to user table 
router.post('/users', function (req, res) {
  res.send("We received your user info");
})

//GET skeleton route for getting ONE band info
router.get('/bands', function (req, res) {
  res.send("we are getting band!");
})

//POST skeleton route to post data to band table for ONE band
router.post('/bands', function (req, res) {
  res.send("We received your band info");
})

//GET skeleton route for getting ONE show info
router.get('/shows', function (req, res) {
  res.send("we are getting show!");
})

//POST skeleton route to post data ONE show table
router.post('/shows', function (req, res) {
  res.send("We received your show info");
})

//GET skeleton route for getting ONE venue info
router.get('/venues', function (req, res) {
  res.send("we are getting a venue!");
})

//POST skeleton route to post data ONE venue table
router.post('/venues', function (req, res) {
  res.send("We received your venue info");
})

//GET skeleton route for getting ONE comment info
router.get('/comments', function (req, res) {
  res.send("we are getting comment!");
})

//POST skeleton route to post data ONE comment table
router.post('/comments', function (req, res) {
  res.send("We received your comment info");
})

//GET skeleton route for getting the two user types
router.get('/types', getTypes);


module.exports = router;