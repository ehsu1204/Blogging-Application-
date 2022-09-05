import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Blog from './components/blogs';
import loginFeature from './services/login';
// import blogService from './services/blogs';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);
  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const loginButton = async (event) => {
    event.preventDefault();
    try {
      const user = await loginFeature.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {}
  };
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <form onSubmit={loginButton}>
        <div>
          username
          <input
            placeholder='please enter a username'
            onChange={usernameChange}
            value={username}
          ></input>
        </div>
        <div>
          password{' '}
          <input
            type='password'
            placeholder='please enter a password'
            onChange={passwordChange}
            value={password}
          ></input>
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default App;
