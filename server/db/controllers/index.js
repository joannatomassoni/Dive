// compile all controllers and export to router from here
const { 
    addFanToBand,
    addGenreToBand,
    createUser,
    deleteUser,
    getAllBands,
    getBandFans,
    getBandGenres,
    getBandShows,
    getFanBands,
    getSingleUser,
    removeBandGenre,
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
    getAllShows,
    getFanRSVPs,
    getSingleShow,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
} = require('./Show');

module.exports = {
    addFanToBand,
    addFanToVenue,
    addGenreToBand,
    createUser,
    createShow,
    deleteUser,
    getAllBands,
    getAllShows,
    getAllVenues,
    getBandFans,
    getBandGenres,
    getBandShows,
    getFanBands,
    getFanRSVPs,
    getFanVenues,
    getShowRSVPs,
    getAllShows,
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
    updateUserBio,
    updateBandPhoto,
    updateBandFB,
    updateBandInstagram,
    updateBandSpotify,
    createComment,
    getAllComments
}