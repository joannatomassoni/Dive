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
        const { id_show, id_fan } = req.body;
        await RSVP.create({
            id_show: id_show,
            id_fan: id_fan
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
        // show id
        const { id_fan, id_show } = req.body;
        await RSVP.destroy({
            where: {
                id_fan: id_fan,
                id_show: id_show
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
        const id_fan = req.params.id;
        const rsvps = await RSVP.findAll({
            where: {
                id_fan: id_fan
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
        const id_show = req.params.id;
        const rsvps = await RSVP.findAll({
            where: {
                id_show: id_show
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