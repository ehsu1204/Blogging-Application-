const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const loginRouter = express.Router();
const User = require('../models/User');

// loginRouter.post('/', async (request, resonse) => {
//   const { Username, Password } = request.body;

//   const user = await User.findOne({ Username });
//   console.log(user);
//   const passwordValidation =
//     user === null ? false : await bcrypt.compare(password, user.passwordHash);
// });

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username });

  const passwordValidation =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordValidation)) {
    return response.status(401).json({
      error: 'invalid user and password',
    });
  }
  const userToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 });
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
