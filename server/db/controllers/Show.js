const { Show } = require('../sequelize');

// Create show
const createShow = async (req, res) => {
    const { name, date, id_venue } = req.body;
    try {
        await Show.create({
            name: name,
            date: date,
            id_venue: id_venue
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}


// Get all upcoming shows

// Update show

// Delete show

module.exports = {
    createShow,
}