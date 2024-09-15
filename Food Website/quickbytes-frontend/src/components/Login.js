import React, { useState } from 'react';
import { loginUser } from '../api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);  // Save token to localStorage
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className='login-main'>
      <div className="container-login">
        <h2>Login to QuickBites</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
