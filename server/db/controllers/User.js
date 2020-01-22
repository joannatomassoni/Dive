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
            typeId: type.id,
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
        res.send(err);        
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

// Get all bands
const getAllBands = async (req, res) => {
    try {
        const bands = await User.findAll({
            where: {
                typeId: 2
            }
        })
        res.send(bands);
    }
    catch (err) {
        console.log(err);
        res.end(err);
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
        res.send(err);
    }
}

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

module.exports = {
    addFanToVenue,
    addGenreToBand,
    createUser,
    getBandGenres,
    getSingleUser,
    addFanToBand,
    getAllBands,
}