/**
 * This is where our endpoints are created and our controller functions are called.
 * Descriptions will include what is needed from the request body and/or endpoint parameters
 * Mostly, req.body should include strings of names
 */

const express = require('express');
const router = express.Router();
const ctrl = require('./db/controllers/index')


// GENERAL USERS ROUTES

// Signup / create user
/**
 * req.body = 
 * { 
 *  name REQUIRED
 *  typeName REQUIRED
 *  bio
 *  link_facebook
 *  link_spotify
 *  link_instagram
 *  photo 
 * }
 */
router.post('/users', ctrl.createUser);

// add push token to user record
router.patch('/users/:name/push', ctrl.addPushToken)

// add calendar id and permission
router.patch('/users/:name/cal', ctrl.addCalID)

// Used for user login and getting a single band
router.get('/users/:name', ctrl.getSingleUser)

// Update user info
// req.body = { bio }
router.patch('/users/:id/bio', ctrl.updateUserBio)

// Delete user
router.delete('/users/:id', ctrl.deleteUser)


/**
 * SEARCH FEATURE
 */
router.get('/search/bands/:query', ctrl.searchBands)
router.get('/search/shows/:query', ctrl.searchShows)
router.get('/search/venues/:query', ctrl.searchVenues)


/**
 * BANDS
 */
// Get all bands 
router.get('/bands', ctrl.getAllBands)

// Update band photo
// req.body = { photo }
router.patch('/bands/:id/photo', ctrl.updateBandPhoto)

// Update band social media links
// req.body = { link_facebook }
router.patch('/bands/:id/fb', ctrl.updateBandFB)
// req.body = { link_instagram }
router.patch('/bands/:id/insta', ctrl.updateBandInstagram)
// req.body = { link_spotify }
router.patch('/bands/:id/spotify', ctrl.updateBandSpotify)

// Get band's upcoming gigs
router.get('/bands/:id/shows', ctrl.getBandUpcomingGigs)

// Get band's previous shows
router.get('/shows/:id/oldShows', ctrl.getBandsPreviousShows)

/**
 * BANDS-FANS
 */
// User follows a band
// req.body = { id_fan }
router.post('/bands/:id/fans/', ctrl.followBand)

// User unfollows a band
// req.body = { id_fan }
router.delete('/bands/:id/fans', ctrl.unfollowBand)

// Get all fans of a given band. 
router.get('/bands/:id/fans', ctrl.getBandFollowers);

// Get all bands that a given fan is following
router.get('/fans/:id/bands', ctrl.getFanBands);

/**
 * VENUES
 */
// Create a venue
router.post('/venues', ctrl.createVenue)

// Edit venue info
router.patch('/venues/:id', ctrl.updateVenue)

// Get one venue and its upcoming shows
router.get('/venues/:id', ctrl.getSingleVenue)

// Get all venues
router.get('/venues', ctrl.getAllVenues);

// Remove a venue
router.delete('/venues/:id', ctrl.removeVenue);

/**
 * VENUES-FANS
 */
// User follows a venue
// req.body = { id_fan }
router.post('/venues/:id/fans', ctrl.addFanToVenue);

// User unfollows a venue
// req.body = { id_fan }
router.delete('/venues/:id/fans', ctrl.unfollowVenue);

// Get all venues that a user follows
router.get('/fans/:id/venues', ctrl.getFanVenues)

// Get all users who follow a given venue
router.get('/venues/:id/fans', ctrl.getVenueFans)

/**
 * SHOWS
 */

// Create a show
// req.body = { name, date, time, venueName, photo, bandNames }
// bandNames is an array
// date and time are both strings, like '7/20' and '9:00PM'
// photo is optional
router.post('/shows', ctrl.createShow)

router.patch('/shows/:id', ctrl.updateShow)

router.delete('/shows/:id', ctrl.deleteShow)

// Get all upcoming public shows
router.get('/shows', ctrl.getAllUpcomingShows)

// Get a single show
router.get('/shows/:id', ctrl.getSingleShow)


/**
 * RSVPs (shows/fans)
 */
// Fan rsvps to a show
// req.body = { id_show, id_fan }
router.post('/shows/rsvps', ctrl.rsvpFanToShow)

// Remove a fan rsvp from a show
// req.body = { id_show, id_fan }
router.delete('/shows/rsvps', ctrl.removeFanRSVP)

// Get fans who have rsvpd to a given show. 
router.get('/shows/:id/rsvps', ctrl.getShowRSVPs)

// Get upcoming shows that a user has rsvpd to. 
router.get('/fans/:id/rsvps', ctrl.getFanUpcomingRSVPs)

// Get past shows a user has attended
router.get('/shows/:id/oldrsvps', ctrl.getFansPreviousShows)

/**
 * SHOW COMMENTS
 */
// Create a comment
// req.body = { id_user, text }
router.post('/shows/:id/comments', ctrl.createComment);

// Get all comments for a show
router.get('/shows/:id/comments', ctrl.getAllComments);


/**
 * TYPES
 */
// Get two types (for signup form?)
router.get('/types', ctrl.getTypes);


module.exports = router;