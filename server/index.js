require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

let PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use imported router for all endpoints
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT} 🚀`);
});
