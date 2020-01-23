// Requiring the models we need for our queries
// The User model contains instances of both fans and bands. 
// Controllers for fans and bands are found here. 
const { 
        BandGenre,
        FanVenue,
        Genre,
        User, 
        Type, 
        sequelize
    } = require('../sequelize');

// Create user
const createUser = async (req, res) => {
    try {
        const { name, typeName, bio, link_facebook, link_spotify, link_instagram, photo } = req.body;
        const type = await Type.findOne({
            where: {
                typeName: typeName
            }
        });
        User.create({
            name,
            id_type: type.id,
            bio,
            link_facebook,
            link_instagram,
            link_spotify,
            photo
        });
        res.status(201).send('success');
    }
    catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
}

// Get single user
const getSingleUser = async (req, res) => {
    try {
        // TODO: change this to a name passed in from body
        const { id } = req.params;
        const user = await User.findOrCreate({
            where: {
                id: id
            }
        })
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);        
    }
}

// Get all bands
const getAllBands = async (req, res) => {
    try {
        const bands = await User.findAll({
            where: {
                id_type: 2
            }
        })
        res.send(bands);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow bands to choose genres for themselves
const addGenreToBand = async (req, res) => {
    try {
        const { bandName, genreName } = req.body;
        const band = await getRecordByName('band', bandName);
        const genre = await getRecordByName('genre', genreName);
        BandGenre.create({
            id_band: band.id,
            id_genre: genre.id
        })
        res.sendStatus(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// get band genres
const getBandGenres = async (req, res) => {
    try {
        const { bandName } = req.params;
        const band = await getRecordByName('band', bandName);
        const genres = await BandGenre.findAll({
            where: { id_band: band.id }
        });
        Promise.all(genres.map(async(genre) => {
         const singleGenre = await Genre.findOne({
             where: {
                 id: genre.id_genre
             }
         }) 
         return singleGenre;
        })).then((data) => {
            const genreNames = data.map(genre => {
                return genre.genreName;
            })
            res.send(genreNames);
        })
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// delete genre from band
const removeBandGenre = async (req, res) => {
    try {
        const { bandName, genreName } = req.body;
        const band = await getRecordByName('band', bandName);
        const genre = await getRecordByName('genre', genreName);
        await BandGenre.destroy({
            where: {
                id_genre: genre.id,
                id_band: band.id
            }
        })
        res.send(200);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }  
}

// allow a fan follow a band
const addFanToBand = async (req, res) => {
    try {
        const sql = 'INSERT INTO fans_bands (id_band, id_fan, createdAt, updatedAt) VALUES (?, ?, ?, ?)';
        const { bandName, fanName } = req.body;
        const band = await getRecordByName('band', bandName);
        const fan = await getRecordByName('fan', fanName);
        await sequelize.query(sql, {
            replacements: [band.id, fan.id, new Date(), new Date()]
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

// Get all fans of a given band
// TODO: fix this so it's not returning two copies of the fans
const getBandFans = async (req, res) => {
    try {
        const { bandName } = req.params;
        const band = await getRecordByName('band', bandName);
        const sql = `SELECT * FROM users WHERE id IN (
                        SELECT id_fan FROM fans_bands WHERE id_band = ?)`;
        const fans = await sequelize.query(sql, {
            replacements: [band.id]
        })
        res.status(200).send(fans[0]);
    }
    catch (err) {
        console.log(err)
        res.send(400);
    }
}

// Allow fans to rsvp to a show

// Get fans who have rsvpd to a show

// Allow user to follow a venue
const addFanToVenue = async (req, res) => {
    const { id_fan, id_venue } = req.body;
    try {
        FanVenue.create({
            id_fan,
            id_venue
        })
    res.send(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
} 

// Get fans who follow a given venue

// Update user

// Delete user

// // QUERY HELPERS?
// const getBandIDFromName = async (name) => {
//     const id = await User.findOne({
//         // attributes is not currently working as expected
//         attributes: ['id'],
//         where: {
//             name: name
//         }
//     });
//     return id;
// }



/**
 * This is a helper function to grab all data from a single record 
 * when provided its name, depending on the type
 * 
 * @param {*} type 
 * @param {*} name 
 */
const getRecordByName = async (type, name) => {
    try {
        if (type === 'band' || type === 'fan') {
            let userRecord = await User.findOne({
                attributes: ['id'],
                where: {
                    name: name
                }
            });
            return userRecord;
        } 
        if (type === 'genre') {
            const genreRecord = await Genre.findOne({
                attributes: ['id'],
                where: {
                    genreName: name
                }
            });
            return genreRecord;
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    addFanToVenue,
    addGenreToBand,
    createUser,
    removeBandGenre,
    getBandFans,
    getBandGenres,
    getSingleUser,
    addFanToBand,
    getAllBands,
}