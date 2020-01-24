// Requiring the models we need for our queries
const { Comment, Show, User } = require('../sequelize');
const { getRecordByName } = require('./utils')

const createComment = async (req, res) => {
  try {
    console.log(req.body.show);
    const show = await Show.findAll({
      where: {
        name: req.body.show
      }
    })
    Comment.create({
      text: req.body.text,
      id_user: req.params.id_user,
      id_show: show[0].id
    })
    console.log("we're saving a comment", req.body.text);
    res.send(201);
  }
  catch (err) {
    console.log("we didn't save a comment", err);
    res.send(400);
  }
}

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        id_show: req.params.id_show
      }
    });
    console.log("retrieved comments from db", comments);
    res.status(200).send(comments);
    // return venues;
  }
  catch (err) {
    console.log("can't get comments", err);
    res.send(err);
  }

}

module.exports = {
  createComment, getAllComments
}