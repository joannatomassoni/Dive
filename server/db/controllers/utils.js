const { User, Genre, Venue, Show } = require('../sequelize');

/**
 * These are a helper functions to grab all data from a single record 
 * when provided its name or id, depending on the type
 * We use this in the controllers to grab record info 
 * when we're passed a name from the front end
 * 
 * (call it with await in an async function)
 * 
 * @param {*} type (genre, venue, fan, band, or user)
 * @param {*} name (passed in through req.body)
 */
const getRecordByName = async (type, name) => {
    try {
        if (type === 'band' || type === 'fan' || type === 'user') {
            let userRecord = await User.findOne({
                where: {
                    name: name
                }
            });
            return userRecord;
        } 
        if (type === 'genre') {
            const genreRecord = await Genre.findOne({
                where: {
                    genreName: name
                }
            });
            return genreRecord;
        }
        if (type === 'venue') {
            const venueRecord = await Venue.findOne({
                where: {
                    name: name
                }
            });
            return venueRecord;
        }
        if (type === 'show') {
            const showRecord = await Show.findOne({
                where: {
                    name: name
                }
            });
            return showRecord;
        }
    }
    catch(err) {
        console.log(err);
    }
}

const getRecordByID = async (type, id) => {
    try {
        if (type === 'band' || type === 'fan' || type === 'user') {
            let userRecord = await User.findOne({
                where: {
                    id: id
                }
            });
            return userRecord;
        } 
        if (type === 'genre') {
            const genreRecord = await Genre.findOne({
                where: {
                    id: id
                }
            });
            return genreRecord;
        }
        if (type === 'venue') {
            const venueRecord = await Venue.findOne({
                where: {
                    id: id
                }
            });
            return venueRecord;
        }
        if (type === 'show') {
            const showRecord = await Show.findOne({
                where: {
                    id: id
                }
            });
            return showRecord;
        }
    }
    catch(err) {
        console.log(err);
    }
}

const timeConversion = (date, time) => {
    let year = 2020;
    let month;
    let day;
    let hour;
    let minutes;

    day = (date[date.length - 2] + date[date.length - 1]) - 1;
    if (date.length = 4) {
        month = Number(date[0]) - 1;
    } else {
        month = Number(date[0] + date[1]) - 1;
    }
    
    if (time.length === 6) {
        hour = time[0];
        minutes = Number((time[2] + time[3])) + 1;
    } else {
        hour = time[0] + time[1];
        minutes = Number(time[3] + time[4]) + 1;
    }
    if (time.includes('P')) {
        hour = Number(hour) + 12;
    }
    return {
        year,
        month,
        day,
        hour,
        minutes,
    }
}

module.exports = {
    getRecordByName,
    getRecordByID,
    timeConversion
}