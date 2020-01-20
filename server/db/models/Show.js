module.exports = (sequelize, type) => {
    return sequelize.define('show', {
      name: {
        type: type.STRING,
        allowNull: false
      },
      date: {
        type: type.DATE,
        allowNull: false
      },
    })
  }