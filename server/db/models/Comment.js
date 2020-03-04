/**
 * Define and export the comments table. 
 * Has foreign keys referencing users table (who left the comment) 
 * and the shows table (the show the user left the comment in).
 */

module.exports = (sequelize, type) => {
  return sequelize.define('comment', {
    text: {
      type: type.STRING,
      allowNull: false
    },
  })
}