/**
 * Define and export the bands_genres table. 
 * Fields are foreign keys referencing the users and genres tables.
 * */

module.exports = (sequelize) => {
    return sequelize.define('bands_genre', {})
}