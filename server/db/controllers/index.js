// compile all controllers and export to router from here
const { createUser, getSingleUser, getAllFans, getAllBands } = require('./User');
const { getTypes } = require('./Type');
const { createVenue } = require('./Venue');

module.exports = {
    createUser,
    getSingleUser,
    getAllFans,
    getTypes,
    getAllBands,
    createVenue
}