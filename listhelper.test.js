const listHelper = require('./utils/list_helper');

// test('dummy returns one', () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });

describe('total likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(12);
  });
});

describe('most number of likes post', () => {
  const blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
  ];

  test('max amount of likes', () => {
    const result = listHelper.maxLikes(blogs);
    expect(result).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    });
  });
});
