/**
 * This is where our endpoints are created and our controllers are called.
 * Descriptions will include what is needed from the request body and/or endpoint parameters
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
router.get('/users/:id', ctrl.getSingleUser)


/**
 * BANDS ROUTES
 */
// get all bands 
// FIXME: rendering empty array currently
router.get('/bands', ctrl.getAllBands)

// add genre to band
router.post('/bands/genres', ctrl.addGenreToBand)

// get a given band's genres. 
// id in params is the band's id.
router.get('/bands/genres/:id', ctrl.getBandGenres);

// TODO:
// delete a genre from a band
// req.body = { id_band, id_genre }
router.delete('/bands/genres')

// add fan for band
// req.body = { id_band, id_fan }
router.post('/bands/fans', ctrl.addFanToBand)

// get all fans of a given band. 
// id in params is the band's id.
router.get('/bands/fans/:id', ctrl.getBandFans);

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

// TODO:
// add a show
router.post('/shows', ctrl.createShow)

// TODO:
// get a single show
// router.post('/shows:id', () => {})


/**
 * RSVPs (shows/fans)
 */
// fan rsvps to a show
// req.body = { id_user, id_fan }
router.post('/shows/rsvps', ctrl.rsvpFanToShow)

// remove a fan rsvp from a show
// req.body = { id_fan, id_show }
router.delete('/shows/rsvps', ctrl.removeFanRSVP)

// get fans who have rsvpd to a given show. 
// id in params will be the show's id.
router.get('/shows/rsvps/:id', ctrl.getShowRSVPs)

// get shows that a given fan has rsvpd to. 
// id in params will be the fan's id.
router.get('/fans/rsvps/:id', ctrl.getFanRSVPs)


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