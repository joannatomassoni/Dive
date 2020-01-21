const { Venue } = require('../sequelize');

// Create venue
const createVenue = (req, res, next) => {
    console.log('hey');
    const { name, address1, address2, city, state, zip_code } = req.body;
    Venue.create({
        name,
        address1,
        address2,
        city,
        state,
        zip_code
    })
    .then(() => console.log('success'))
    .catch((err) => console.log(err));
    next();
}


// Read venue

// Update venue

// Delete venue

module.exports = {
    createVenue,
}