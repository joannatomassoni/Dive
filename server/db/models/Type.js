module.exports = (sequelize, type) => {
    return sequelize.define('type', {
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
    })
  }