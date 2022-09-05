require('dotenv').config();
const PORT = process.env.PORT;
const URL = process.env.URL;
console.log(URL);
console.log('hi');
module.exports = {
  PORT,
  URL,
};
