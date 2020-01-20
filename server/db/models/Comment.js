module.exports = (sequelize, type) => {
  return sequelize.define('comment', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    text: {
      type: type.STRING,
      allowNull: false
    },
  })
}