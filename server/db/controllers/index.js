// compile all controllers and export to router from here
const { addFanToVenue,
    addFanToBand,
    addGenreToBand,
    createUser,
    deleteUser,
    getAllBands,
    getBandFans,
    getBandGenres,
    getSingleUser,
    removeBandGenre,
    updateUserBio,
    updateBandPhoto
} = require('./User');
const { getTypes } = require('./Type');
const { createComment, getAllComments } = require('./Comment');
const { createVenue, getAllVenues, removeVenue, getVenueShows } = require('./Venue');
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
    getFanRSVPs,
    getShowRSVPs,
    getAllShows,
    getSingleUser,
    getSingleShow,
    getTypes,
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