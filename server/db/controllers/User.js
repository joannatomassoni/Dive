// Requiring the models we need for our queries
// The User model contains instances of both fans and bands. 
// Controllers for fans and bands are found here. 
const { 
        BandGenre,
        Genre,
        User, 
        Type, 
        sequelize
    } = require('../sequelize');

const { getRecordByName, getRecordByID } = require('./utils');

// Create user
const createUser = async (req, res) => {
    try {
        const { name, typeName, bio, link_facebook, link_spotify, link_instagram, photo } = req.body;
        const type = await Type.findOne({
            where: {
                typeName: typeName
            }
        });
        await User.create({
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
        res.sendStatus(400);
    }
}

// Get single user
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getRecordByID('user', id);
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);        
    }
}

// Update user bio
const updateUserBio = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio } = req.body;
        await User.update(
            { bio: bio }, 
            { where: { id: id },
            returning: true,
            plain: true
            })
        res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Update band photo
const updateBandPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { photo } = req.body;
        // const [ number, user ]  = await getRecordByName('user', name);
        await User.update(
            { bandPhoto: photo }, 
            { where: { id: id },
            returning: true,
            plain: true
            })
        res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}


// TODO: function to let bands edit their social media info
const updateBandSM = async (req, res) => {

}

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
                name: name
            }
        })
        res.sendStatus(200);
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
        const { genreName } = req.body;
        const { id } = req.params;
        const genre = await getRecordByName('genre', genreName);
        BandGenre.create({
            id_band: id,
            id_genre: genre.id
        })
        res.sendStatus(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// TODO: refactor to use eager loading
// get band genres
const getBandGenres = async (req, res) => {
    try {
        const { id } = req.params;
        const genres = await BandGenre.findAll({
            where: { id_band: id }
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
        const { id } = req.params;
        const { genreName } = req.body;
        const genre = await getRecordByName('genre', genreName);
        await BandGenre.destroy({
            where: {
                id_genre: genre.id,
                id_band: id
            }
        })
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }  
}

// allow a fan follow a band
const addFanToBand = async (req, res) => {
    try {
        const sql = 'INSERT INTO fans_bands (id_band, id_fan, createdAt, updatedAt) VALUES (?, ?, ?, ?)';
        const { id } = req.params;
        const { id_fan } = req.body;
        await sequelize.query(sql, {
            replacements: [id, id_fan, new Date(), new Date()]
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

// TODO: refactor to use eager loading
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
        res.sendStatus(400);
    }
}


module.exports = {
    addFanToBand,
    addGenreToBand,
    createUser,
    deleteUser,
    getAllBands,
    getBandFans,
    getBandGenres,
    getSingleUser,
    removeBandGenre,
    updateUserBio,
    updateBandPhoto
}