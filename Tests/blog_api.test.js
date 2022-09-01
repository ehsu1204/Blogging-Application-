const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const app = require('../app');
const { execPath, send } = require('process');

const api = supertest(app);

test('just checking', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// test('number of blogs', async () => {
//   const test = await api.get('/api/blogs');
//   expect(test.body.length).toBe(6);
// });

test('id is actually defined', async () => {
  const test = await api.get('/api/blogs');
  expect(test.body.id).not.toBeDefined();
});

// test('new blog is actually added', async () => {
//   const sizeBefore = await Blog.countDocuments({});
//   const newBlog = {
//     title: 'title',
//     author: 'author',
//     url: 'www.testurl.com',
//   };
//   const test = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const numberOfBlogs = await Blog.countDocuments({});
//   expect(numberOfBlogs).toEqual(sizeBefore + 1);
// });

test('is it missing title or url', async () => {
  const newBlog = {
    author: 'author',
    url: 'www.testurl.com',
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
});

// test('missing title and url prop', async () => {
//   const newBlog = {
//     // title: 'title',
//     // author: 'author',
//     url: 'www.testurl.com',
//     likes: 7,
//   };
//   if (!newBlog.title || !newBlog.url) {
//     await api.post('/api/blogs').send(newBlog).expect(404);
//   }
test('x', async () => {
  const newBlog = {
    title: 'XD',
    author: 'author',
    url: 'www.testurl.com',
  };

  await api.post('/api/blogs').send(newBlog).expect(201);
  const response = await api.get('/api/blogs');
  console.log(response);
  const match = response.findOne({ title: newBlog.title }).exec();
});

afterAll(() => {
  mongoose.connection.close();
});
