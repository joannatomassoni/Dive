/**
 * Define and export the shows table.
 * Has foreign key reference to venues and users tables 
 * (the latter for bands who are playing the show)
 */

module.exports = (sequelize, type) => {
  return sequelize.define('show', {
    name: {
      type: type.STRING,
      allowNull: false
    },
    date: {
      type: type.STRING,
      allowNull: false
    },
    time: {
      type: type.STRING,
      allowNull: false
    },
    dateTime: {
      type: type.DATE,
      allowNull: false
    },
    flyer: {
      type: type.STRING,
      allowNull: true
    },
    description: {
      type: type.STRING,
    },
  })
}