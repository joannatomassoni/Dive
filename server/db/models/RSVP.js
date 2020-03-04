/**
 * Define and export the rsvps table.
 * Fields are foreign key referneces to users and shows tables.
 * Represents which users have RSVP'd to which shows.
 */

module.exports = (sequelize) => {
    return sequelize.define('rsvp', {})
}