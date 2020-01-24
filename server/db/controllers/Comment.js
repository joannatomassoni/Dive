// Requiring the models we need for our queries
const { Comment, Show, User } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils')

const createComment = async (req, res) => {
  try {
    const { showName, userName, text } = req.body;
    const user = await getRecordByName('user', userName)
    const show = await Show.findAll({
      where: {
        name: showName
      }
    })
    Comment.create({
      text: text,
      id_user: user.id,
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