const config = require('./utils/config');
const express = require('express');
const app = express();
const blogRouter = require('./Controllers/Blogs');
const { default: mongoose } = require('mongoose');
const logger = require('./utils/logger');
const cors = require('cors');

logger.info('connecting to', config.URL);

mongoose //connects to database
  .connect(config.URL)
  .then(() => {
    logger.info('connected to mongoDB');
  })
  .catch((error) => {
    logger.error('error conneting', error.message);
  });

app.use(cors());
app.use(express.static('build'));

app.use(express.json()); //parses incoming json

app.use('/api/blogs', blogRouter);

module.exports = app;
