const { Sequelize } = require('sequelize');
// we will require our models here
const { CommentModel, 
        FanBandModel, 
        FanVenueModel, 
        GenreModel, 
        ShowModel, 
        TypeModel, 
        UserModel, 
        VenueModel } = require('./models/index')

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
const Type = TypeModel(sequelize, Sequelize);
const FanBand = FanBandModel(sequelize, Sequelize);
const FanVenue = FanVenueModel(sequelize, Sequelize);
const Genre = GenreModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Show = ShowModel(sequelize, Sequelize);
const Venue = VenueModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);


// create associations, save in variables to use in queries
// each user has one type
User.Type = User.belongsTo(Type, { foreignKey: { allowNull: false } })
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
// // join table for fans and bands
// User.belongsToMany(User, {
//   as: 'fan',
//   through: 'fan_band',
//   foreignKey: {
//     name: 'id_band',
//     allowNull: false
//   },
//   otherKey: {
//     name: 'id_fan',
//     allowNull: false
//   }
// });
User.hasMany(FanBand, { as: 'id_fan' });
User.hasMany(FanBand, { as: 'id_band' });

// join table for venues and fans
User.hasMany(FanVenue, { foreignKey: 'id_fan' });
Venue.hasMany(FanVenue, { foreignKey: 'id_venue' });

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

// create database and tables, and prepopulate type and genre tables
// TODO: should we prepopulate venues?
// got rid of force: true so db does not empty on every server reload
// sequelize.sync()
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  }).then(() => {
    Type.create({
      typeName: 'fan'
    });
    Type.create({
      typeName: 'band'
    });
    Genre.create({
      genreName: 'rock'
    });
    Genre.create({
      genreName: 'punk'
    });
    Genre.create({
      genreName: 'folk'
    });
    Genre.create({
      genreName: 'indie'
    });
    Genre.create({
      genreName: 'brass'
    });
    Genre.create({
      genreName: 'jazz'
    });
  })
  .catch((err) => {
    console.log(err);
  })


module.exports = {
  // export sequelize for the model creation
  sequelize, Genre, Comment, FanVenue, User, Show, Type, Venue
}