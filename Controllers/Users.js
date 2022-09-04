const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

userRouter.post('/', async (request, response) => {
  console.log(request.body);
  const { username, password, name } = request.body;
  console.log(username, password);
  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(404).json({
      error: 'please enter a username or pass or enter the required length',
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds); //hashes password
  const user = new User({
    //creates a new User
    username,
    password: passwordHash, //store hashpassword instead of the actual password from the request
    name: name,
  });
  console.log(user);
  const newUser = await user.save();
  response.status(201).json(newUser);
});

userRouter.get('/', async (request, response) => {
  const getUsers = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(getUsers);
});

//REMEMBER TO DELETE THIS ROUTE
userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(200).send();
});
module.exports = userRouter;
