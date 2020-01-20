module.exports = (sequelize, type) => {
  return sequelize.define('comment', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: type.STRING,
      allowNull: false
    },
    id_user: {
      type: type.INTEGER,
      allowNull: false,
    },
    id_show: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}