// Requiring the models we need for our queries
const { Comment, Show, User } = require('../sequelize');
const { sendNotifications } = require('../pushNotifications/pushNotifications')

// Create a comment in a show modal
const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user, text } = req.body;
    const show = await Show.findOne({
      where: {
        id
      },
      include: [
        { model: User, as: 'Fans', attributes: ['expoPushToken'] },
        { model: User, as: 'bands', attributes: ['expoPushToken'] }
      ]
    })

    Comment.create({
      text: text,
      id_user,
      id_show: id
    })

    // Send push notifications to bands when comment is added
    let pushTokens = [];
    show.bands.forEach(band => {
      pushTokens.push(band.expoPushToken);
    })
    const title = `New comment in ${show.name}`;
    const body = 'Open Dive for more info.';

    await sendNotifications(pushTokens, title, body);

    res.sendStatus(201);
  }
  catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: {
        id_show: id
      },
      include: [
        { model: User }
      ]
    });
    res.status(200).send(comments);
  }
  catch (err) {
    console.log("can't get comments", err);
    res.send(err);
  }

}

module.exports = {
  createComment, getAllComments
}