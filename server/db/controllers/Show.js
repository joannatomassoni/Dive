// Requiring the models we need for our queries
const { Show, RSVP, User, ShowBand, Venue } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils')

// Create show
const createShow = async (req, res) => {
    try {
        const { name, date, time, photo, venueName, bandNames } = req.body;
        const venue = await getRecordByName('venue', venueName);
        // add bands and venue to ShowBand join tables
        const show = await Show.create({
            name: name,
            date: date,
            time: time,
            photo: photo,
            id_venue: venue.id
        })
        bandNames.forEach(async (bandName) => {
            const band = await getRecordByName('band', bandName);
            await ShowBand.create({
                id_show: show.id,
                id_band: band.id
            })
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// Get all upcoming shows in database
const getAllShows = async (req, res) => {
    try {
<<<<<<< HEAD
        const shows = await Show.findAll()
        console.log("retrieved shows from db", shows);
        res.send(shows);
        // return venues;
    }
    catch (err) {
        console.log("couldn't get shows", err);
        res.send(err);
    }
}

=======
        // array of shows
        const shows = await Show.findAll({
            include: [
                { model: User, as: 'bands' }, 
                // { model: User, as: 'bands', through: { attributes: ['name'] } }, 
                { model: Venue }
                // { model: Venue, through: { attributes: ['name'] }}
            ],
        });
        res.status(200).send(shows); 
    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
}
>>>>>>> 124e523ca0d8244c2e11584c481f5f1fa527db0a

// Allow fan to rsvp to a show
const rsvpFanToShow = async (req, res) => {
    try {
        const { showName, fanName } = req.body;
        const show = await getRecordByName('show', showName);
        const fan = await getRecordByName('fan', fanName);
        await RSVP.create({
            id_show: show.id,
            id_fan: fan.id
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// Allow fan to remove their rsvp
const removeFanRSVP = async (req, res) => {
    try {
        const { fanName, showName } = req.body;
        const show = await getRecordByName('show', showName);
        const fan = await getRecordByName('fan', fanName);
        await RSVP.destroy({
            where: {
                id_fan: fan.id,
                id_show: show.id
            }
        })
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// TODO: refactor to use eager loading
// Get all shows that a given user has rsvpd to
const getFanRSVPs = async (req, res) => {
    try {
        const { fanName } = req.params;
        const fan = await getRecordByName('fan', fanName);
        const rsvps = await RSVP.findAll({
            where: {
                id_fan: fan.id
            }
        })
        Promise.all(rsvps.map(async (rsvp) => {
            const show = await Show.findOne({
                where: {
                    id: rsvp.id_show
                }
            })
            return show;
        })).then((data) => {
            res.send(data)
        })
    }
    catch (err) {
        console.log(err)
        res.send(400);
    }
}

// TODO: refactor to use eager loading
// Get all fans who have rsvpd to a show
const getShowRSVPs = async (req, res) => {
    try {
        const { showName } = req.params;
        const show = await getRecordByName('show', showName);
        const rsvps = await RSVP.findAll({
            where: {
                id_show: show.id
            }
        })
        Promise.all(rsvps.map(async (rsvp) => {
            console.log(rsvp);
            const fan = await User.findOne({
                where: {
                    id: rsvp.id_fan
                }
            })
            return fan;
        })).then((data) => {
            res.send(data)
        })
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// Update show

// Delete show

module.exports = {
    createShow,
    getAllShows,
    getFanRSVPs,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    getAllShows
}