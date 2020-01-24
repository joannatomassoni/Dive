// Requiring the models we need for our queries
const { Comment, Show, User } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils')

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, text } = req.body;
    const user = await getRecordByName('user', userName)
    const show = await Show.findAll({
      where: {
        id
      }
    })
    Comment.create({
      text: text,
      id_user: user.id,
      id_show: show[0].id
    })
    console.log("we're saving a comment", req.body.text);
    res.sendStatus(201);
  }
  catch (err) {
    console.log("we didn't save a comment", err);
    res.sendStatus(400);
  }
}

const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: {
        id_show: id
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