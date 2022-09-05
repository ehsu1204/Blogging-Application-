// const dummy = (blogs) => {
//   return 1;
// };

const totalLikes = (blogs) => {
  return blogs.reduce((prevLikes, curr) => prevLikes + curr.likes, 0);
};

const maxLikes = (blogs) => {
  return blogs.reduce((p, n) => (p.likes > n.likes ? p : n));
};
module.exports = {
  //   dummy,
  totalLikes,
  maxLikes,
};
