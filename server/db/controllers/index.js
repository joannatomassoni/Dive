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
    updateUserPhoto
} = require('./User');
const { getTypes } = require('./Type');
const { createVenue, getAllVenues, removeVenue, getVenueShows } = require('./Venue');
const {
    createShow,
    getFanRSVPs,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow
} = require('./Show');

module.exports = {
    addFanToBand,
    addFanToVenue,
    addGenreToBand,
    createUser,
    createShow,
    deleteUser,
    getAllBands,
    getAllVenues,
    getBandFans,
    getBandGenres,
    getFanRSVPs,
    getShowRSVPs,
    getSingleUser,
    getTypes,
    createVenue,
    removeVenue,
    removeFanRSVP,
    removeBandGenre,
    rsvpFanToShow,
    updateUserBio,
    updateUserPhoto,
    getVenueShows

}