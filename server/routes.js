/**
 * This is where our endpoints are created and our controllers are called.
 * Descriptions will include what is needed from the request body and/or endpoint parameters
 * Mostly req.body should include strings of names
 */

const express = require('express');
const router = express.Router();
const ctrl = require('./db/controllers/index')

// GENERAL USERS ROUTES

// signup / create user
/**
 * req.body = 
 * { 
 * name REQUIRED
 * typeName REQUIRED
 * bio
 * link_facebook
 * link_spotify
 * link_instagram
 * photo 
 * }
 */
// creates fans and bands
router.post('/users', ctrl.createUser);

// Used for user login and getting a single band
// id in param is user id
// TODO: refactor to take in name instead of id
router.get('/users/:id', ctrl.getSingleUser)

// Update user info
router.patch('/users/:name/bio', ctrl.updateUserBio)

// Update user photo
router.patch('/users/:name/photo', ctrl.updateUserPhoto)

// Delete user
router.delete('/users/:name', ctrl.deleteUser)

/**
 * BANDS ROUTES
 */
// get all bands 
// FIXME: rendering empty array currently
router.get('/bands', ctrl.getAllBands)

// add genre to band
router.post('/bands/genres', ctrl.addGenreToBand)

// get a given band's genres. 
router.get('/bands/genres/:bandName', ctrl.getBandGenres); 

// delete a genre from a band
// req.body = { bandName, genreName }
router.delete('/bands/genres', ctrl.removeBandGenre)

// add fan for band
// req.body = { bandName, fanName }
router.post('/bands/fans', ctrl.addFanToBand)

// get all fans of a given band. 
// id in params is the band's id.
router.get('/bands/fans/:bandName', ctrl.getBandFans);

/**
 * VENUES
 */
// TODO:
// create a venue
router.post('/venues', ctrl.createVenue)

// TODO:
// get one venue
router.get('/venues', ctrl.getAllVenues);

// TODO: 
// get all venues

// TODO:
// add fan to venue
router.post('/venues/fans', ctrl.addFanToVenue);

// TODO:
// get all venues that a fan follows

/**
 * SHOWS
 */
// TODO:
// get all shows
router.get('/shows', function (req, res) {
  res.send("we are getting show!");
})

// add a show
router.post('/shows', ctrl.createShow)

// TODO:
// get a single show
// router.post('/shows:id', () => {})


/**
 * RSVPs (shows/fans)
 */
// fan rsvps to a show
// req.body = { showName, fanName }
router.post('/shows/rsvps', ctrl.rsvpFanToShow)

// remove a fan rsvp from a show
// req.body = { showName, fanName }
router.delete('/shows/rsvps', ctrl.removeFanRSVP)

// get fans who have rsvpd to a given show. 
router.get('/shows/rsvps/:name', ctrl.getShowRSVPs)

// get shows that a given fan has rsvpd to. 
router.get('/fans/rsvps/:name', ctrl.getFanRSVPs)


/**
 * SHOW COMMENTS
 */
// TODO:
// create a comment
router.post('/comments', function (req, res) {
  res.send("We received your comment info");
})

// TODO: 
// get all comments for a show
router.get('/comments', function (req, res) {
  res.send("we are getting comment!");
})

/**
 * TYPES
 */
// get two types (for signup form?)
router.get('/types', ctrl.getTypes);


module.exports = router;