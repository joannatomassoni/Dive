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
router.get('/users/:id', ctrl.getSingleUser)

// Update user info
// req.body = { bio }
router.patch('/users/:id/bio', ctrl.updateUserBio)

// Update band photo
// req.body = { photo }
router.patch('/users/:id/photo', ctrl.updateBandPhoto)

// Delete user
router.delete('/users/:id', ctrl.deleteUser)

/**
 * BANDS ROUTES
 */
// get all bands 
router.get('/bands', ctrl.getAllBands)

// add genre to band
// req.body = { genreName }
router.post('/bands/:id/genres', ctrl.addGenreToBand)

// get a given band's genres. 
router.get('/bands/:id/genres', ctrl.getBandGenres);

// delete a genre from a band
// req.body = { genreName }
router.delete('/bands/:id/genres', ctrl.removeBandGenre)

// add fan for band
// req.body = { id_fan }
router.post('/bands/:id/fans/', ctrl.addFanToBand)

// get all fans of a given band. 
router.get('/bands/:id/fans', ctrl.getBandFans);

// get all bands that a given fan is following
router.get('/fans/:id/bands', ctrl.getFanBands);

/**
 * VENUES
 */
// create a venue
router.post('/venues', ctrl.createVenue)

// get one venue and its upcoming shows
router.get('/venues/:id', ctrl.getSingleVenue)
 
// get all venues
router.get('/venues', ctrl.getAllVenues);

//to remove a venue
router.delete('/venues/:id', ctrl.removeVenue);

//to get all shows from a venue
router.get('/venues/:id/shows', ctrl.getVenueShows);

// add fan to venue
// req.body = { fanName }
router.post('/venues/:id/fans', ctrl.addFanToVenue);

// get all venues that a fan follows
router.get('/fans/:id/venues', ctrl.getFanVenues)

// get all fans who follow a given venue
router.get('/venues/:id/fans', ctrl.getVenueFans)

/**
 * SHOWS
 */

// create a show
// req.body = { name, date, time, venueName, photo, bandNames }
// bandNames is an array
// date and time are both strings, like '7/20' and '9:00PM'
// photo is optional
router.post('/shows', ctrl.createShow)

// get all shows
router.get('/shows', ctrl.getAllShows)

// get a single show
router.get('/shows/:id', ctrl.getSingleShow)


/**
 * RSVPs (shows/fans)
 */
// fan rsvps to a show
// req.body = { id_show, id_fan }
router.post('/shows/rsvps', ctrl.rsvpFanToShow)

// remove a fan rsvp from a show
// req.body = { id_show, id_fan }
router.delete('/shows/rsvps', ctrl.removeFanRSVP)

// get fans who have rsvpd to a given show. 
router.get('/shows/:id/rsvps', ctrl.getShowRSVPs)

// get shows that a given fan has rsvpd to. 
router.get('/fans/:id/rsvps', ctrl.getFanRSVPs)


/**
 * SHOW COMMENTS
 */
// create a comment
// req.body = { id_user, text }
router.post('/shows/:id/comments', ctrl.createComment);

// get all comments for a show
router.get('/shows/:id/comments', ctrl.getAllComments);


/**
 * TYPES
 */
// get two types (for signup form?)
router.get('/types', ctrl.getTypes);


module.exports = router;