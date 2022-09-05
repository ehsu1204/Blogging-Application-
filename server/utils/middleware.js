const logger = require('./logger');
const Blog = require('../Controllers/Blogs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
// };

const tokenExtractor = (request, response, next) => {
  let token = null;
  const authorization = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }
  request.token = token;
  next();
};
const errorHandler = (error, request, response, next) => {
  //   if (error.name === 'CastError') {
  //     return response.status(400).send({ error: 'malformatted id' });
  //   } else if (error.name === 'ValidationError') {
  //     return response.status(400).json({ error: error.message });
  //   } else if (error.name === 'JsonWebTokenError') {
  //     return response.status(401).json({
  //       error: 'invalid token',
  //     });
  //   } else if (error.name === 'TokenExpiredError') {
  //     return response.status(401).json({
  //       error: 'token expired',
  //     });
  //   }
  if (error.name === 'JsonWebTokenError') {
    return response.json({ error: 'invalid web token' });
  }
  next(error);
};

const extractingUser = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = jwt.verify(request.token, process.env.SECRET);
    request.user = token.id;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  errorHandler,
  extractingUser,
};
