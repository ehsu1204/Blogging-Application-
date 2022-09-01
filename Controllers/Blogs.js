const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response.status(400).send('Please include title and url');
  } else if (!blog.likes) {
    blog.likes = 0;
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } else {
    const savedBlog = blog.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send('deleted');
});

module.exports = blogRouter;
