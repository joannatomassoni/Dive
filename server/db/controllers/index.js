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
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    getAllShows
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