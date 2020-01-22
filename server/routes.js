const express = require('express');
const router = express.Router();
const ctrl = require('./db/controllers/index');

router.get('/', function (req, res) {
  res.send("we're getting routes!");
})

// SIGNUP
router.post('/users', ctrl.createUser);

// Used for user login and getting a single band
router.get('/users/:name', ctrl.getSingleUser)

// GET skeleton route for getting all fans
router.get('/fans', ctrl.getAllFans);

// GET skeleton route for getting all band info
router.get('/bands', ctrl.getAllBands)

// POST skeleton route to post data to band table for ONE band
router.post('/bands', function (req, res) {
  res.send("We received your band info");
})

// GET skeleton route for getting ONE show info
router.get('/shows', function (req, res) {
  res.send("we are getting show!");
})

// POST skeleton route to post data ONE show table
router.post('/shows', function (req, res) {
  res.send("We received your show info");
})

// GET skeleton route for getting ONE venue info
router.get('/venues', function (req, res) {
  res.send("we are getting a venue!");
})

// POST skeleton route to post data ONE venue table
router.post('/venues', ctrl.createVenue)

// GET skeleton route for getting ONE comment info
router.get('/comments', function (req, res) {
  res.send("we are getting comment!");
})

// POST skeleton route to post data ONE comment table
router.post('/comments', function (req, res) {
  res.send("We received your comment info");
})

// GET skeleton route for getting the two user types
router.get('/types', ctrl.getTypes);


module.exports = router;