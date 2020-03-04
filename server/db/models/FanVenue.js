/**
 * Define and export the fans_venues table. 
 * Fields are two foreign keys referencing the users and venues tables.
 * Represents which user follows which venue.
 * */

module.exports = (sequelize) => {
    return sequelize.define('fans_venue', {})
}