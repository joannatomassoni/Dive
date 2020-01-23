// Requiring the models we need for our queries
const { Show, RSVP, User } = require('../sequelize');
const { getRecordByName } = require('./utils')

// Create show
const createShow = async (req, res) => {
    const { name, date, venueName } = req.body;
    const venue = await getRecordByName('venue', venueName);
    try {
        await Show.create({
            name: name,
            date: date,
            id_venue: venue.id
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}

// TODO:
// Get all upcoming shows in database

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

// Get all shows that a given user has rsvpd to
const getFanRSVPs = async (req, res) => {
    try {
        const { fanName } = req.body;
        const fan = await getRecordByName('fan', fanName);
        const rsvps = await RSVP.findAll({
            where: {
                id_fan: fan.id
            }
        }) 
        Promise.all(rsvps.map(async(rsvp) => {
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

// Get all fans who have rsvpd to a show
const getShowRSVPs = async (req, res) => {
    try {
        const { showName } = req.body;
        const show = await getRecordByName('show', showName);
        const rsvps = await RSVP.findAll({
            where: {
                id_show: show.id
            }
        })
        Promise.all(rsvps.map(async(rsvp) => {
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
    catch(err) {
        console.log(err);
        res.send(400);
    }
}

// Update show

// Delete show

module.exports = {
    createShow,
    getFanRSVPs,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow
}