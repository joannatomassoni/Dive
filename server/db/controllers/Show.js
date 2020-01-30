// require moment for date formatting for 
const moment = require('moment');
// Requiring the models we need for our queries
const { Show, RSVP, User, ShowBand, Venue, Comment, Sequelize, sequelize } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils');
const { sendNotifications } = require('../../pushNotifications/pushNotifications')


// import the Sequelize operators
const Op = Sequelize.Op;

// // 2020-06-12T14:42:42.000Z
// const dateTime = moment('2020-06-12T14:42:42.000Z').format('llll');
// const time = moment('2020-06-12T14:42:42.000Z').format('LT');
// const date = moment('2020-06-12T14:42:42.000Z').format('ll');

// Create show
const createShow = async (req, res) => {
    try {
        let { name, dateTime, flyer, venueName, bandNames, description } = req.body;
        const venue = await getRecordByName('venue', venueName);
        // format dateTime to be used for sorting and to be passed back as human-friendly strings
        // dateTime = moment(dateTime).format('llll');
        const time = moment.utc(dateTime).format('LT');
        const date = moment(dateTime).format('ll');

        // add bands and venue to ShowBand join tables
        const show = await Show.create({
            name: name,
            date: date,
            time: time,
            dateTime: dateTime,
            flyer: flyer,
            description: description,
            id_venue: venue.id
        })
        const pushTokens = [];
        await bandNames.forEach(async (bandName) => {
            const band = await getRecordByName('band', bandName);
            await ShowBand.create({
                id_show: show.id,
                id_band: band.id
            })
            // get all followers of a given band, push their tokens to the pushTokens array
            const sql = `SELECT * FROM users WHERE id IN (
                SELECT id_fan FROM fans_bands WHERE id_band = ?)`;
            const followers = await sequelize.query(sql, {
                replacements: [band.id]
            })
            console.log(followers);
            followers[0].forEach((follower) => {
                pushTokens.push(follower.expoPushToken)
            })
            // Construct title and body to send in push notification message to each group of followers for each band
            const title = `${band.name} just announced a new show!`;
            const body = 'Swipe to see more.';
            sendNotifications(pushTokens, title, body);
        })

        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Update a show
const updateShow = async (req, res) => {
    try {
        const { id } = req.params;
    }
    catch {

    }
}

// Delete a show
const deleteShow = async (req, res) => {
    try {
        const { id } = req.params;
        await Show.destroy({
            where: {
                id
            }
        });
        res.sendStatus(200)
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// Get all upcoming shows in database
const getAllUpcomingShows = async (req, res) => {
    try {
        const shows = await Show.findAll({
            where: {
                dateTime: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            },
            include: [
                { model: User, as: 'bands' },
                { model: Venue }
            ],
        });
        res.status(200).send(shows);
    }
    catch (err) {
        res.send(err);
    }
}

// get detailed info for single show
const getSingleShow = async (req, res) => {
    try {
        const { id } = req.params;
        const show = await Show.findOne({
            where: {
                id
            },
            include: [
                { model: User, through: ShowBand, as: 'bands', attributes: ['id', 'name'] },
                { model: Venue, attributes: ['id', 'name'] },
                { model: User, as: 'Fans', attributes: ['id', 'name'] },
                { model: Comment }
            ]
        })
        res.send(show);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow fan to rsvp to a show
const rsvpFanToShow = async (req, res) => {
    try {
        const { id_fan, id_show } = req.body;
        await RSVP.create({
            id_show,
            id_fan
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow fan to remove their rsvp
const removeFanRSVP = async (req, res) => {
    try {
        const { id_fan, id_show } = req.body;
        await RSVP.destroy({
            where: {
                id_fan,
                id_show
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
        const { id } = req.params;
        const rsvps = await RSVP.findAll({
            where: {
                id_fan: id
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
        res.sendStatus(400);
    }
}

// TODO: refactor to use eager loading
// Get all fans who have rsvpd to a show
const getShowRSVPs = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvps = await RSVP.findAll({
            where: {
                id_show: id
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
        res.sendStatus(400);
    }
}


module.exports = {
    createShow,
    deleteShow,
    getAllUpcomingShows,
    getFanRSVPs,
    getSingleShow,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    updateShow,
}