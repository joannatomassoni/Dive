// Requiring the models we need for our queries
const { Venue, Show } = require('../sequelize');
const bodyParser = require('body-parser');

// Create venue
const createVenue = async (req, res) => {
    try {
        const { name, address1, address2, city, state, zip_code } = req.body;
        Venue.create({
            name,
            address1,
            city,
            state,
            zip_code
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}
//raw mysql data format to enter data into db
//INSERT INTO `venues` (`name`, `address1`, `city`, `zip_code`, `createdAt`,`updatedAt`) VALUES ('Tipitinas', '501 Napolean Ave', 'New Orleans', 70115, '2020-01-01 10:10:10', '2020-01-01 10:10:10');

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll()
        console.log("retrieved venues from db", venues);
        res.status(200).send(venues);
        // return venues;
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

// Get shows at a given venue
const getVenueShows = async (req, res) => {
    try {
        const venue = await Venue.findAll({
            where: {
                name: req.params.venueName
            }
        })
        const venueShows = await Show.findAll({
            where: {
                id_venue: venue[0].id
            }
        })
        console.log("got shows at this venue", venueShows);
        res.send(venueShows);
    }
    catch (err) {
        console.log("error getting shows from this venue", err);
        res.send(err);
    }
}



// Update venue
const updateVenue = async (req, res) => {
    try {
        const update = await Venue.update(
            {
                name: req.params.name,
                address1: req.params.address1,
                city: req.params.city,
                state: req.params.state,
                zip_code: req.params.zip_code
            },
            { where: { name: req.params.name } }
        )
        console.log("updated venue");
        res.send(200);
    }
    catch {
        console.log("error updating venue in db", err);
        res.send(400);
    }
}

// Delete venue
const removeVenue = async (req, res) => {
    try {
        console.log(req);
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
        res.send(400);
    }
}




module.exports = {
    createVenue, getAllVenues, removeVenue, getVenueShows
}

