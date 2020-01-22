const { User, Type, sequelize } = require('../sequelize');

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
        res.send(err);
    }
}

// Get single user
const getSingleUser = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findOrCreate({
            where: {
              name: name
            }
          })
          res.status(200).send(user);
    }
    catch (err) {
        res.send(err);        
    }
}

// Get all fans
const getAllFans = async (req, res, next) => {
    try {
        const { band } = req.body;
        const sql = `SELECT * FROM users WHERE id IN 
                        (SELECT id_fan FROM fan_band WHERE id_band IN (
                            SELECT id from users WHERE name = ?
                        ))`
        const fans = await sequelize.query(sql, [band]);
        res.status(200).send(fans);
    }
    catch (err) {
        res.send(500, 'Failed to get fans');
    }
}

// Get fans who have rsvpd to a show

// Get fans who follow a given band

// Get fans who follow a given venue

// Update user

// Delete user

// Get all bands
const getAllBands = (req, res) => {
    User.findAll()
        .then((users) => {
            console.log(users);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}

module.exports = {
    createUser,
    getSingleUser,
    getAllFans,
    getAllBands,
}