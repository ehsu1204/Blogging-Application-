const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// const getToken = (request) => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
// };
//Getting all blogs
blogRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate('user'); //This shows the user associated with the blog
  response.json(Blogs);
});
//Adding a new blog
blogRouter.post('/', async (request, response) => {
  const body = request.body;
  // const token = getToken(request);

  // const decodeToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.user) {
    return response.status(401).json({ error: 'not valid' });
  }
  const user = await User.findById(request.user);
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).send('Please include title and url');
  } else if (!blog.likes) {
    blog.likes = 0;
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id); //so this shows up on the /users endpoint
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    const savedBlog = blog.save();
    response.status(201).json(savedBlog);
  }
});
//Deleting a specific Blog
blogRouter.delete('/:id', async (request, response) => {
  const blogOwner = await Blog.findById(request.params.id);

  // const decodeToken = await jwt.verify(request.token, process.env.SECRET); SAME AS request.token middleware

  if (blogOwner.user.toString() === request.user) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(200).send();
  } else {
    response.status(404).send('errr');
  }
});

//Increasing the number of likes
blogRouter.patch('/:id', async (request, response) => {
  const currentNumberOfLikes = await Blog.findById(request.params.id);
  const updated = await Blog.findByIdAndUpdate(request.params.id, {
    likes: currentNumberOfLikes.likes + 1,
  });

  response.status(200).json(updated);
});

module.exports = blogRouter;
