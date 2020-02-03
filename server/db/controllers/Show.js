// require moment for date formatting for 
const moment = require('moment');
// Requiring the models we need for our queries
const { Show, RSVP, User, ShowBand, Venue, Comment, Sequelize, sequelize } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils');
const { sendNotifications } = require('../pushNotifications/pushNotifications')

// import the Sequelize operators
const Op = Sequelize.Op;

// // 2020-06-12T14:42:42.000Z
// const dateTime = moment('2020-06-12T14:42:42.000Z').format('llll');
// const time = moment('2020-06-12T14:42:42.000Z').format('LT');
// const date = moment('2020-06-12T14:42:42.000Z').format('ll');

// Create show
const createShow = async (req, res) => {
    try {
        let { name, dateTime, flyer, venueName, bandNames, description, status } = req.body;
        
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
            status: status,
            id_venue: venue.id
        })

        // Sending push notifications and adding to shows_bands join table
        // Create push tokens array
        await bandNames.forEach(async (bandName) => {
            let bandTokens = [];
            const band = await getRecordByName('band', bandName);
            await ShowBand.create({
                id_show: show.id,
                id_band: band.id
            })

            // Notify band followers
            // get all followers of a given band, push their tokens to the pushTokens array
            const sql = `SELECT * FROM users WHERE id IN (
                SELECT id_fan FROM fans_bands WHERE id_band = ?)`;
            const followers = await sequelize.query(sql, {
                replacements: [band.id]
            })
            console.log('followers: ', followers);
            followers[0].forEach((follower) => {
                bandTokens.push(follower.expoPushToken)
            })
            // Construct title and body to send in push notification message to each group of followers for each band
            const title = `New show from ${band.name}!`;
            const body = 'Open Dive for more info.';
            await sendNotifications(bandTokens, title, body);
        })


        // Notifications for venue followers
        let venueTokens = [];
        // Get followers of the venue
        const sql = `SELECT * FROM users WHERE id IN (
            SELECT id_fan FROM fans_venues WHERE id_venue = ?)`;
        const followers = await sequelize.query(sql, {
            replacements: [venue.id]
        })

        // Add expoPushTokens for each follower to the pushTokens array
        followers[0].forEach((follower) => {
            venueTokens.push(follower.expoPushToken)
        })
        const title = `New show at ${venue.name}!`;
        const body = 'Open Dive for more info.';
        await sendNotifications(venueTokens, title, body);


        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

// Update show
// TODO: add push notifications for rsvps
const updateShow = async (req, res) => {
    try {
        const { id } = req.params;
        const { fieldName, newInfo } = req.body;
        await Show.update(
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

// Delete a show
// TODO: add push notifications for rsvps
const deleteShow = async (req, res) => {
    try {
        const { id } = req.params;
        await Show.destroy({
            where: {
                id
            }
        });
        res.sendStatus(200)
        //
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// Get all upcoming public shows in database
const getAllUpcomingShows = async (req, res) => {
    try {
        const shows = await Show.findAll({
            where: {
                [Op.and]: [
                    { dateTime: { [Op.gte]: moment().toDate() } },
                    // Placeholder "private" venue will be created initially and have an id of 1
                    // Private shows are assigned to the venue called "private"
                    // Querying for all shows on main page will ignore these shows
                    { id_venue: { [Op.gt]: 1 } }
                ]
            },
            include: [
                { model: User, as: 'bands' },
                { model: Venue }
            ],
            order: [
                ['dateTime', 'ASC']
            ]
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

//gets previous/past RSVPed shows
//will need users id
const getPreviousShows = async (req, res) => {
    // console.log("is this previousShows working?")
    try {
        const { id } = req.params;
        const oldshows = await RSVP.findAll({
            where: {
                id_fan: id,
                createdAt: {
                    [Op.lt]: new Date()
                }
            }
        })
        Promise.all(oldshows.map(async (rsvp) => {
            const show = await Show.findOne({
                where: {
                    id: rsvp.id_show
                }
            })
            return show;
        })).then((data) => {
            console.log("are we getting old shows?", data)
            res.send(data)
        })
    }
    catch (err) {
        console.log("error getting old shows", err)
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

const searchShows = async (req, res) => {
    try {
        const { query } = req.params;
        const shows = await Show.findAll({
                where: {
                    name: { [Op.like]: `%${query}%`}, 
                }
            })
        res.send(shows);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(404)
    }
}


module.exports = {
    createShow,
    deleteShow,
    getAllUpcomingShows,
    getFanRSVPs,
    getPreviousShows,
    getSingleShow,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    searchShows,
    updateShow,
}

