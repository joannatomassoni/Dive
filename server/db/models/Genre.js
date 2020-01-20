module.exports = (sequelize, type) => {
  return sequelize.define('genre', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    genre: {
      type: type.STRING,
      allowNull: false
    },
  })
}