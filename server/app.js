const config = require('./utils/config');

const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./Controllers/Blogs');
const userRouter = require('./Controllers/Users');
const loginRouter = require('./Controllers/Login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const cors = require('cors');
console.log('hello');
logger.info('connecting to', config.URL);
console.log(config.URL);
mongoose //connects to database
  .connect(config.URL)
  .then(() => {
    logger.info('connected to mongoDB');
  })
  .catch((error) => {
    logger.error('error conneting', error.message);
  });
app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.static('build'));

app.use(express.json()); //parses incoming json
app.use(middleware.requestLogger);
app.use(middleware.extractingUser);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
