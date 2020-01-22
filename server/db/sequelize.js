const { Sequelize } = require('sequelize');
// we require our models here to be instantiated after sequelize connection is made
const { BandGenreModel,
        CommentModel, 
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
const BandGenre = BandGenreModel(sequelize, Sequelize);
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

// TODO: figure out fan/band associations
// // join table for fans and bands
User.belongsToMany(User, {
  as: 'fan',
  through: 'fans_bands',
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
User.hasMany(FanVenue, { foreignKey: 'id_fan' });
Venue.hasMany(FanVenue, { foreignKey: 'id_venue' });

// join table for bands and genres
User.hasMany(BandGenre, { foreignKey: 'id_band' });
Genre.hasMany(BandGenre, { foreignKey: 'id_genre' });

// each comment has one user
Comment.belongsTo(User, { foreignKey: { allowNull: false } });
// each comment has one show
Comment.belongsTo(Show, { foreignKey: { allowNull: false } });
// each show has many comments
Show.belongsToMany(Comment, { through: 'show_comments' })

// create database and tables, and prepopulate type and genre tables
// TODO: should we prepopulate venues?

// get rid of force: true if you don't want db to empty on every server reload
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
  sequelize, BandGenre, Genre, Comment, FanVenue, User, Show, Type, Venue
}