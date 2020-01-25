// Requiring the models we need for our queries
const { Venue, Show, User, FanVenue, sequelize } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils');

// Create venue
// should we include photos?
const createVenue = async (req, res) => {
    try {
        const { name, address, city, state, zip_code } = req.body;
        Venue.findOrCreate({
            name,
            address,
            city,
            state,
            zip_code
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll()
        console.log("retrieved venues from db", venues);
        res.status(200).send(venues);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// get single venue
const getSingleVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findOne({
            where: {
                id
            },
            include: [
                { model: Show }
            ]
        })
        res.send(venue);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get shows at a given venue
// this might not be necessary
const getVenueShows = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findOne({
            where: {
                id
            }
        })
        const venueShows = await Show.findAll({
            where: {
                id_venue: venue.id
            },
            include: [
                { model: User, as: 'bands', attributes: ['id', 'name'] }, 
            ],
        })
        console.log("got shows at this venue", venueShows);
        res.send(venueShows);
    }
    catch (err) {
        console.log("error getting shows from this venue", err);
        res.sendStatus(400);
    }
}

// Allow user to follow a venue
const addFanToVenue = async (req, res) => {
    const { id } = req.params;
    const { fanName } = req.body;
    const fan = await getRecordByName('fan', fanName);
    try {
        FanVenue.create({
            id_fan: fan.id,
            id_venue: id
        })
    res.sendStatus(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
} 

// get venues that a fan follows
const getFanVenues = async (req, res) => {
    try {
        const { id } = req.params;
        const fanVenues = await User.findAll({
            where: {
                id
            },
            include: [
                { model: Venue, attributes: ['name']}
            ]
        })
        res.send(fanVenues);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

// Get fans who follow a given venue
const getVenueFans = async (req, res) => {
    try {
        const { id } = req.params;
        const venueFans = await Venue.findAll({
            where: {
                id
            },
            include: [
                { model: User, as: 'fans', attributes: ['name']}
            ]
        })
        res.send(venueFans);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}


// Update venue
const updateVenue = async (req, res) => {
    try {
        const { name, address, city, state, zip_code } = req.params;
        await Venue.update(
            {
                name: name,
                address: address,
                city: city,
                state: state,
                zip_code: zip_code
            },
            { where: { name: name } }
        )
        console.log("updated venue");
        res.sendStatus(200);
    }
    catch {
        console.log("error updating venue in db", err);
        res.sendStatus(400);
    }
}

// Delete venue
const removeVenue = async (req, res) => {
    try {
        await Venue.destroy({
            where: {
                name: req.body.name
            }
        })

        console.log("deleted venue from db", req);
        res.sendStatus(200);
    }
    catch {
        console.log("error deleting venue from db");
        res.sendStatus(400);
    }
}

module.exports = {
    addFanToVenue,
    createVenue, 
    getAllVenues,
    getFanVenues, 
    getSingleVenue,
    getVenueFans,
    getVenueShows,
    removeVenue
}
