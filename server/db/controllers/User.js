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
        console.log(bands);
        res.send(bands);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow bands to choose genres for themselves
const addGenreToBand = async (req, res) => {
    const { id_band, id_genre } = req.body;
    try {
        BandGenre.create({
            id_band,
            id_genre
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// FIXME:
// get band genres
const getBandGenres = async (req, res) => {
    try {
        const { id } = req.params;
        const genres = await BandGenre.findAll({
            where: { id_band: id }
        });
        const getGenres = () => { 
            return Promise.all(genres.map(async(genre) => {
                return Genre.findOne({
                    where: {
                        id: genre.id_genre
                    }
                }); 
        }))}
        getGenres().then(response => console.log(response));
        res.sendStatus(200);
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
        const id_band = await User.findOne({
            // attributs is not currently working as expected
            attributes: ['id'],
            where: {
                name: bandName
            }
        });
        const id_genre = await Genre.findOne({
            attributes: ['id'],
            where: {
                genreName: genreName
            }
        })
        await BandGenre.destroy({
            where: {
                id_genre: id_genre.id,
                id_band: id_band.id
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
        const { id_band, id_fan } = req.body;
        await sequelize.query(sql, {
            replacements: [id_band, id_fan, new Date(), new Date()]
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
        const { id } = req.params;
        const sql = `SELECT * FROM users WHERE id IN (
                        SELECT id_fan FROM fans_bands WHERE id_band = ?)`;
        const fans = await sequelize.query(sql, {
            replacements: [id]
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