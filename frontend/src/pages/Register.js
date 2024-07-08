import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../styles/Register.css'; // Import the CSS file
import { getRandomColor } from '../utils'; // Import the function

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await register(formData);
      alert('Registration successful');
      navigate('/login'); // Navigate to login on successful registration
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const [backgroundColor] = useState(getRandomColor());

  return (
    <div className="register-container" style={{ backgroundColor }}>
      <div className="register-box">
        <img src="/logo.png" alt="Logo" className="register-logo" />
        <h1 className="register-title">vibecheck</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input name="username" type="text" onChange={handleChange} placeholder="Username" />
          <input name="email" type="email" onChange={handleChange} placeholder="Email" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" />
          <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" />
          <button type="submit">Register</button>
        </form>
        <button onClick={handleLoginRedirect}>Login</button>
      </div>
    </div>
  );
};

export default Register;
