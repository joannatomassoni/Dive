const { User, Type, FanVenue, sequelize } = require('../sequelize');

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
        const { name } = req.params;
        const user = await User.findOrCreate({
            where: {
              name: name
            }
          })
          res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        res.send(err);        
    }
}

// function to allow a fan follow a band
const addFanToBand = async (req, res) => {
    // console.log('hey');
    // try {
    //     const sql = 'INSERT INTO fan_band (id_band, id_fan, createdAt, updatedAt) VALUES (?, ?, ?, ?)';
    //     const { id_band, id_fan } = req.body;
    //     await sequelize.query(sql, {
    //         replacements: [id_band, id_fan, new Date(), new Date()]
    //     })
    //     res.send(201);
    // }
    // catch (err) {
    //     console.log(err);
    //     res.send(err);
    // }
}

// // Get all fans 
// // this is probably unnecessary
// const getAllFans = async (req, res) => {
//     try {
//         const fans = await User.findAll({
//             where: {
//                 typeId: 1
//             }
//         })
//         res.send(fans);
//     }
//     catch (err) {
//         res.send(500, 'Failed to get fans');
//     }
// }

// Get fans who have rsvpd to a show

// Get fans who follow a given band

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

module.exports = {
    addFanToVenue,
    createUser,
    getSingleUser,
    addFanToBand,
    getAllBands,
}