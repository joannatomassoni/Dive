module.exports = (sequelize, type) => {
  return sequelize.define('genre', {
    genre: {
      type: type.STRING,
      allowNull: false
    },
  })
}