require('dotenv').config();
const PORT = process.env.PORT;
const URL = process.env.URL;
console.log(URL);
module.exports = {
  PORT,
  URL,
};
