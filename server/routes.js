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

// router.post('/users/push', ctrl.sendNotification)

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

router.get('/bands/:id/shows', ctrl.getBandShows)

/**
 * Search button routes
 */

 router.get('/search/bands/:query', ctrl.searchBands)
 router.get('/search/shows/:query', ctrl.searchShows)
 router.get('/search/venues/:query', ctrl.searchVenues)

/**
 * BANDS ROUTES
 */
// get all bands 
router.get('/bands', ctrl.getAllBands)

// Update band photo
// req.body = { photo }
router.patch('/bands/:id/photo', ctrl.updateBandPhoto)

// Update band SM links
// req.body = { link_facebook }
router.patch('/bands/:id/fb', ctrl.updateBandFB)
// req.body = { link_instagram }
router.patch('/bands/:id/insta', ctrl.updateBandInstagram)
// req.body = { link_spotify }
router.patch('/bands/:id/spotify', ctrl.updateBandSpotify)

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
router.post('/bands/:id/fans/', ctrl.followBand)

// allow user to unfollow a band
// req.body = { id_fan }
router.delete('/bands/:id/fans', ctrl.unfollowBand)

// get all fans of a given band. 
router.get('/bands/:id/fans', ctrl.getBandFollowers);

// get all bands that a given fan is following
router.get('/fans/:id/bands', ctrl.getFanBands);

/**
 * VENUES
 */
// create a venue
router.post('/venues', ctrl.createVenue)

// edit venue info
router.patch('/venues/:id', ctrl.updateVenue)

// get one venue and its upcoming shows
router.get('/venues/:id', ctrl.getSingleVenue)

// get all venues
router.get('/venues', ctrl.getAllVenues);

//to remove a venue
router.delete('/venues/:id', ctrl.removeVenue);

// add fan to venue
// req.body = { id_fan }
router.post('/venues/:id/fans', ctrl.addFanToVenue);

// unfollow a venue
// req.body = { id_fan }
router.delete('/venues/:id/fans', ctrl.unfollowVenue);


// get all venues that a fan follows
router.get('/fans/:id/venues', ctrl.getFanVenues)

//get all fans who follow a given venue
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

router.patch('/shows/:id', ctrl.updateShow)

router.delete('/shows/:id', ctrl.deleteShow)

// get all upcoming public shows
router.get('/shows', ctrl.getAllUpcomingShows)

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

//get past shows a user has attended
router.get('/shows/:id/oldrsvps', ctrl.getPreviousShows)

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