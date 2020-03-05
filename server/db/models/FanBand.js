/**
 * Define and export the fans_bands table.
 * Fields are foreign keys referencing the users table-- the fan and the band.
 * Represents which fan follows which band.
 * */

module.exports = (sequelize) => {
    return sequelize.define('fans_band', {})
}