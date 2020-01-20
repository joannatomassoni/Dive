const { Sequelize } = require('sequelize');
// we will require our models here
const { CommentModel, GenreModel, ShowModel, TypeModel, UserModel, VenueModel } = require('./models/index')

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

// instanstiate the models here
const Genre = GenreModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Show = ShowModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Venue = VenueModel(sequelize, Sequelize);


// create associations
// each user has one type
User.belongsTo(Type, { foreignKey: { allowNull: false } })
// each show has one venue
Show.belongsTo(Venue, { foreignKey: { allowNull: false } });

// join table for shows and fans
Show.belongsToMany(User, {
  as: 'fans',
  through: 'fan_rsvps',
  foreignKey: {
    name: 'id_show',
    allowNull: false
  },
  otherKey: {
    name: 'id_fan',
    allowNull: false
  }
})
// join table for shows and bands
Show.belongsToMany(User, {
  as: 'band',
  through: 'show_bands',
  foreignKey: {
    name: 'id_band',
    allowNull: false
  }
})
// join table for fans and bands
User.belongsToMany(User, {
  as: 'fan',
  through: 'fan_band',
  foreignKey: {
    name: 'id_band',
    allowNull: false
  },
  otherKey: {
    name: 'id_fan',
    allowNull: false
  }
});
// join table for venues and fans
Venue.belongsToMany(User, {
  as: 'fan',
  through: 'fan_venue',
  foreignKey: {
    name: 'id_venue',
    allowNull: false
  },
  otherKey: {
    name: 'id_fan',
    allowNull: false
  }
})
// join table for bands and genres
// TODO: verify this is correct
User.belongsToMany(Genre, {
  as: 'band',
  through: 'band_genre',
  foreignKey: {
    name: 'id_band',
    allowNull: false
  },
  otherKey: {
    name: 'id_genre',
    allowNull: false
  }
});
// each comment has one user
Comment.belongsTo(User, { foreignKey: { allowNull: false } });
// each comment has one show
Comment.belongsTo(Show, { foreignKey: { allowNull: false } });
// each show has many comments
Show.belongsToMany(Comment, { through: 'show_comments' })



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
  sequelize, Genre, Comment, User, Show, Type, Venue
}