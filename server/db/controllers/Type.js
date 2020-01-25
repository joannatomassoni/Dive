// Requiring the models we need for our queries
// Types shouldn't need to be manipulated
const { Type } = require('../sequelize');

// Read types
const getTypes = (req, res) => {
    return Type.findAll({
        attributes: ['name']
    })
    .then((data) => res.send(data))
    .catch(() => res.sendStatus(400));
}

module.exports = {
    getTypes
}