module.exports = (sequelize, type) => {
  return sequelize.define('comment', {
    text: {
      type: type.STRING,
      allowNull: false
    },
  })
}