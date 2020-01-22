module.exports = (sequelize, type) => {
    return sequelize.define('type', {
      typeName: {
        type: type.STRING,
        allowNull: false
      },
    })
  }