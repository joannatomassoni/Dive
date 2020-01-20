module.exports = (sequelize, type) => {
    return sequelize.define('show', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
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