const { User, Genre, Venue, Show } = require('../sequelize');

/**
 * This is a helper function to grab all data from a single record 
 * when provided its name, depending on the type
 * We use this in the controllers to grab record info 
 * when we're passed a name from the front end
 * 
 * (call it with await in an async function)
 * 
 * @param {*} type (genre, venue, fan, band, or use)
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

module.exports = {
    getRecordByName
}