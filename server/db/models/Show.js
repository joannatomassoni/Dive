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
      photo: {
        type: type.STRING,
        allowNull: true
      },

    })
  }