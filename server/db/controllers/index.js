// compile all controllers and export to router from here
const { addFanToVenue,
    addFanToBand,
    addGenreToBand,
    createUser,
    getAllBands,
    getBandFans,
    getBandGenres,
    getSingleUser
} = require('./User');
const { getTypes } = require('./Type');
const { createVenue, getAllVenues } = require('./Venue');
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
    getAllBands,
    getBandFans,
    getBandGenres,
    getFanRSVPs,
    getShowRSVPs,
    getSingleUser,
    getTypes,
    createVenue,
    removeFanRSVP,
    rsvpFanToShow,
    getAllVenues,
    getAllVenues
}