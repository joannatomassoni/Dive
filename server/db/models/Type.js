/**
 * Define and export the types table. 
 * Referenced in the users table to indicate whether a user is of type 'band' or 'fan'.
 */

module.exports = (sequelize, type) => {
    return sequelize.define('type', {
      typeName: {
        type: type.STRING,
        allowNull: false
      },
    })
  }