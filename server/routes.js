const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.send("we're getting routes!");
})

module.exports = router;