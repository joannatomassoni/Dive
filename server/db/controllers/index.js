// compile all controllers and export to router from here
const { createUser, getAllFans, getAllBands } = require('./User');
const { getTypes } = require('./Type');
const { createVenue } = require('./Venue');

module.exports = {
    createUser,
    getAllFans,
    getTypes,
    getAllBands,
    createVenue
}