// compile all controllers and export to router from here
const { 
    addGenreToBand,
    addPushToken,
    createUser,
    deleteUser,
    followBand,
    getAllBands,
    getBandFollowers,
    getBandGenres,
    getBandShows,
    getFanBands,
    getSingleUser,
    removeBandGenre,
    sendNotification,
    unfollowBand,
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify
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
    unfollowVenue
} = require('./Venue');
const {
    createShow,
    deleteShow,
    getAllUpcomingShows,
    getFanRSVPs,
    getSingleShow,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    updateShow
} = require('./Show');

module.exports = {
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
    getBandFollowers,
    getBandGenres,
    getBandShows,
    getFanBands,
    getFanRSVPs,
    getFanVenues,
    getShowRSVPs,
    getAllUpcomingShows,
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
    sendNotification,
    unfollowBand,
    unfollowVenue,
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify,
    updateShow,
    createComment,
    getAllComments
}