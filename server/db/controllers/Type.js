const { Type } = require('../sequelize');

// Read types
const getTypes = (req, res, next) => {
    return Type.findAll({
        attributes: ['name']
    })
    .then((data) => res.send(data))
    .catch(err => res.sendStatus(400));
}

module.exports = {
    getTypes
}