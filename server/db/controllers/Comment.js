// Requiring the models we need for our queries
const { Comment, Show, User } = require('../sequelize');
const { getRecordByName } = require('./utils')

const createComment = async (req, res) => {
  try {
    const showComment = await Show.findAll({
      where: {
        id_venue: venue[0].id
      } 
      const venueShows = await Show.findAll({
        where: {
          id_venue: venue[0].id
        }
    Comment.create({
          text: req.body.text
        })
    console.log("we're saving a comment", req.body.text);
        res.send(201);
      }
  catch(err) {
        console.log("we didn't save a comment", err);
        res.send(400);
      }
    }

module.exports = {
        createComment
      }