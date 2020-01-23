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
router.get('/users/:name', ctrl.getSingleUser)

// Update user info
// req.body = { bio }
router.patch('/users/:name/bio', ctrl.updateUserBio)

// Update user photo
// req.body = { photo }
router.patch('/users/:name/photo', ctrl.updateBandPhoto)

// Delete user
router.delete('/users/:name', ctrl.deleteUser)

/**
 * BANDS ROUTES
 */
// get all bands 
router.get('/bands', ctrl.getAllBands)

// add genre to band
// req.body = { bandName, genreName }
router.post('/bands/genres', ctrl.addGenreToBand)

// get a given band's genres. 
router.get('/bands/:bandName/genres', ctrl.getBandGenres);

// delete a genre from a band
// req.body = { bandName, genreName }
router.delete('/bands/genres', ctrl.removeBandGenre)

// add fan for band
// req.body = { bandName, fanName }
router.post('/bands/fans', ctrl.addFanToBand)

// get all fans of a given band. 
router.get('/bands/:bandName/fans', ctrl.getBandFans);

/**
 * VENUES
 */
// create a venue
router.post('/venues', ctrl.createVenue)

// TODO:
// get one venue

// TODO: 
// get all venues
router.get('/venues', ctrl.getAllVenues);

//to remove a venue
router.delete('/venues', ctrl.removeVenue);


//to get all shows from a venue
router.get('/venues/shows/:venueName', ctrl.getVenueShows);




// TODO:
// add fan to venue
// req.body = { venueName, fanName }
router.post('/venues/fans', ctrl.addFanToVenue);

// TODO:
// get all venues that a fan follows
router.get('/fans/:fanName/venues')

// TODO:
// get all fans who follow a given venue
// router.get('/venues/fans/:venueName', ctrl.getVenueFans)

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
router.get('/shows/rsvps/:showName', ctrl.getShowRSVPs)

// get shows that a given fan has rsvpd to. 
router.get('/fans/rsvps/:fanName', ctrl.getFanRSVPs)


/**
 * SHOW COMMENTS
 */
// TODO:
// create a comment
router.post('/comments', ctrl.createComment);
// router.post('/comments', function (req, res) {
//   res.send("We received your comment info");
// })

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