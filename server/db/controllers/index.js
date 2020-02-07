// compile all controllers and export to router from here
const {
    addCalID,
    addGenreToBand,
    addPushToken,
    createUser,
    deleteUser,
    followBand,
    getAllBands,
    getBandFollowers,
    getBandGenres,
    getBandUpcomingGigs,
    getBandPastGigs,
    getFanBands,
    getSingleUser,
    removeBandGenre,
    searchBands,
    sendNotification,
    unfollowBand,
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify,
} = require('./User');
const {
    getTypes
} = require('./Type');
const {
    createComment,
    getAllComments
} = require('./Comment');
const {
    addFanToVenue,
    createVenue,
    getAllVenues,
    getFanVenues,
    getSingleVenue,
    getVenueFans,
    removeVenue,
    searchVenues,
    unfollowVenue,
    updateVenue
} = require('./Venue');
const {
    createShow,
    deleteShow,
    getAllUpcomingShows,
    getFanUpcomingRSVPs,
    getSingleShow,
    getShowRSVPs,
    getFansPreviousShows,
    removeFanRSVP,
    rsvpFanToShow,
    searchShows,
    updateShow,
    getBandsPreviousShows
} = require('./Show');

module.exports = {
    addCalID,
    addFanToVenue,
    addGenreToBand,
    addPushToken,
    createUser,
    createShow,
    deleteShow,
    deleteUser,
    followBand,
    getAllBands,
    getAllVenues,
    getAllUpcomingShows,
    getBandFollowers,
    getBandGenres,
    getBandUpcomingGigs,
    getBandPastGigs,
    getFanBands,
    getFanUpcomingRSVPs,
    getFanVenues,
    getShowRSVPs,
    getFansPreviousShows,
    getBandsPreviousShows,
    // getBandShows,
    getSingleShow,
    getSingleUser,
    getSingleVenue,
    getTypes,
    getVenueFans,
    createVenue,
    removeVenue,
    removeFanRSVP,
    removeBandGenre,
    rsvpFanToShow,
    searchBands,
    searchShows,
    searchVenues,
    sendNotification,
    unfollowBand,
    unfollowVenue,
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify,
    updateShow,
    updateVenue,
    createComment,
    getAllComments,
    getFanUpcomingRSVPs
}