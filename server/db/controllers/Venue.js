// Requiring the models we need for our queries
const { Venue, Show, User, FanVenue, Sequelize } = require('../sequelize');

// import the Sequelize operators
const Op = Sequelize.Op;

// Create venue
const createVenue = async (req, res) => {
    try {
        const { name, address, city, state, zip_code } = req.body;
        const venue = await Venue.findOrCreate({
            where: {
                name,
            },
            defaults: {
                name,
                address,
                city,
                state,
                zip_code,
            }
        })
        res.status(200).send(venue);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll({
            where: { [Op.not]: { name: 'private' } },
            include: [
                { model: Show, include: [{ model: User, as: 'bands' }] }
            ]
        })
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
                { model: Show, include: [{ model: User, as: 'bands', attributes: ['id', 'name'] }] }
            ]
        })
        res.send(venue);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow user to follow a venue
const addFanToVenue = async (req, res) => {
    const { id } = req.params;
    const { id_fan } = req.body;
    try {
        FanVenue.create({
            id_fan,
            id_venue: id
        })
    res.sendStatus(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
} 

// allow user to unfollow venue
const unfollowVenue = async (req, res) => {
    const { id } = req.params;
    const { id_fan } = req.body;
    try {
        FanVenue.destroy({
            where: {
                id_fan,
                id_venue: id
            }
        })
    res.sendStatus(200);
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
                { model: Venue, attributes: ['id', 'name']}
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


// Update venue info
const updateVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const { fieldName, newInfo } = req.body;
        await Venue.update(
            { [fieldName]: newInfo },
            { where: { id: id },
        })
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
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

const searchVenues = async (req, res) => {
    try {
        const { query } = req.params;
        const venues = await Venue.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%`} }, 
                        { address: { [Op.like]: `%${query}%` } },
                        { city: { [Op.like]: `%${query}%` } }
                    ]
                }
            })
        res.send(venues);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(404)
    }
}

module.exports = {
    addFanToVenue,
    createVenue, 
    getAllVenues,
    getFanVenues, 
    getSingleVenue,
    getVenueFans,
    removeVenue,
    searchVenues,
    unfollowVenue,
    updateVenue
}