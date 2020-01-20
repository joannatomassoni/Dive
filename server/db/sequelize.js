const { Sequelize } = require('sequelize');
// we will require our models here

// create a new sequelize instance
const sequelize = new Sequelize('dive', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
});

// we will instanstiate the models here

// create database and tables
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .catch((err) => {
      console.log(err);
  })


module.exports = {
    // export sequelize for the model creation
    sequelize,
}