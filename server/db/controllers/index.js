// compile all controllers and export to router from here
const { 
    addGenreToBand,
    createUser,
    deleteUser,
    followBand,
    getAllBands,
    getBandFans,
    getBandGenres,
    getBandShows,
    getFanBands,
    getSingleUser,
    removeBandGenre,
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
    createUser,
    createShow,
    deleteShow,
    deleteUser,
    followBand,
    getAllBands,
    getAllVenues,
    getBandFans,
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
    unfollowBand,
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify,
    updateShow,
    createComment,
    getAllComments
}