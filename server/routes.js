const express = require('express');
const router = express.Router();
const ctrl = require('./db/controllers/index');
const { getAllVenues } = require('./db/controllers/Venue');

router.get('/', function (req, res) {
  res.send("we're getting routes!");
})

// SIGNUP
router.post('/users', ctrl.createUser);

// Used for user login and getting a single band
router.get('/users/:id', ctrl.getSingleUser)

// get all bands 
router.get('/bands', ctrl.getAllBands)

// add fan for band
router.post('/bands/fans', ctrl.addFanToBand)

// add genre to band.
router.post('/bands/genres', ctrl.addGenreToBand)

// get a given band's genres. id in params is the band's id.
router.get('/bands/genres/:id', ctrl.getBandGenres); 

// get all fans of a given band. id in params is the band's id.
router.get('/bands/fans/:id', ctrl.getBandFans);

// POST skeleton route to post data to band table for ONE band
router.post('/bands', function (req, res) {
  res.send("We received your band info");
})

// TODO:
// get all shows
router.get('/shows', function (req, res) {
  res.send("we are getting show!");
})

// TODO:
// add a show
router.post('/shows', ctrl.createShow)

// TODO:
// get a single show
// router.post('/shows:id', () => {})


/**
 * RSVPs
 */
// rsvp fan to a show
router.post('/shows/rsvps', ctrl.rsvpFanToShow)

// remove a fan rsvp from a show
// fan id and show id passed in body
router.delete('/shows/rsvps', ctrl.removeFanRSVP)

// get fans who have rsvpd to a given show. id in params will be show id.
router.get('/shows/rsvps/:id', ctrl.getShowRSVPs)

// get shows that a given fan has rsvpd to. id in params will be fan id.
router.get('/fans/rsvps/:id', ctrl.getFanRSVPs)


/**
 * VENUES
 */
// create a venue
router.post('/venues', ctrl.createVenue)

// TODO:
// get one venue
router.get('/venues', function (req, res) {
  getAllVenues()
    .then(response => {

      res.send(response);
      console.log("route is getting data", response);
    })

  // // let venues = getAllVenues();
  // getAllVenues()
  // // .then(response => {
  // // console.log("route is getting venues", response)
  // res.send("we are getting a venue!", res);
  // // })
})

// TODO: 
// get all venues

// TODO:
// add fan to venue
router.post('/venues/fans', ctrl.addFanToVenue);


// TODO:
// create comment
router.post('/comments', function (req, res) {
  res.send("We received your comment info");
})

// TODO: 
// get all comments for a show
router.get('/comments', function (req, res) {
  res.send("we are getting comment!");
})

// get two types (for signup)
router.get('/types', ctrl.getTypes);


module.exports = router;