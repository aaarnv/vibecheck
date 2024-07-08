import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../styles/Login.css'; // Import the CSS file
import { getRandomColor } from '../utils'; // Import the function


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      alert('Login successful');
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const [backgroundColor] = useState(getRandomColor());

  return (
    <div className="login-container" style={{ backgroundColor }}>
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h1 className="login-title">vibecheck</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input name="email" type="email" onChange={handleChange} placeholder="Email" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default Login;
