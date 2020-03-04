/**
 * Define and export the shows_bands table. 
 * Fields are two foreign keys that reference the shows and users tables.
 * Represents which bands are playing which shows.
 * */

module.exports = (sequelize) => {
    return sequelize.define('shows_band', {})
}