// compile all controllers and export to router from here
const { addFanToVenue, addFanToBand, createUser, getSingleUser, getAllBands } = require('./User');
const { getTypes } = require('./Type');
const { createVenue } = require('./Venue');

module.exports = {
    addFanToBand,
    addFanToVenue,
    createUser,
    getSingleUser,
    getAllBands,
    getTypes,
    createVenue
}