// compile all controllers and export to router from here
const { 
    addFanToBand,
    addGenreToBand,
    createUser,
    deleteUser,
    getAllBands,
    getBandFans,
    getBandGenres,
    getFanBands,
    getSingleUser,
    removeBandGenre,
    updateUserBio,
    updateBandPhoto
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
    getVenueShows,
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
    getVenueShows,
    createVenue,
    removeVenue,
    removeFanRSVP,
    removeBandGenre,
    rsvpFanToShow,
    updateUserBio,
    updateBandPhoto,
    createComment,
    getAllComments
}