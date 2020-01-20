module.exports = (sequelize, type) => {
  return sequelize.define('Genres', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    genre: {
      type: type.STRING,
      allowNull: false
    },
  })
}