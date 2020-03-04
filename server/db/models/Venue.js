/**
 * Define and export the venues table.
 * Prepopulated with a handful of New Orleans venues.
 * Referenced in shows table.
 */

module.exports = (sequelize, type) => {
    return sequelize.define('venue', {
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        address: {
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