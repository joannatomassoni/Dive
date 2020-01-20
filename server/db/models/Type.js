module.exports = (sequelize, type) => {
    return sequelize.define('type', {
      name: {
        type: type.STRING,
        allowNull: false
      },
    })
  }