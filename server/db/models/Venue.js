module.exports = (sequelize, type) => {
    return sequelize.define('venue', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        // something like '123 Main Street'
        address1: {
            type: type.STRING,
            allowNull: true,
        },
        // something like 'Apt 2'
        address2: {
            type: type.STRING,
            allowNull: true,
        },
        city: {
            type: type.STRING,
            allowNull: true,
        },
        state: {
            type: type.STRING,
            allowNull: true,
        },
        zip_code: {
            type: type.INTEGER,
            allowNull: true,
        },
    })
}