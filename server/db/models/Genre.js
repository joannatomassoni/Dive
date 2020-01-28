module.exports = (sequelize, type) => {
  return sequelize.define('genre', {
    genreName: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
  })
}