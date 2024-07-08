import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

const Navbar = () => {
  // Get current location using useLocation hook
  const location = useLocation();

  // Check if current location is login or register
  const hideNavbar = location.pathname !== '/dashboard' && location.pathname !== '/socials';

  // Conditionally render Navbar based on hideNavbar
  if (hideNavbar) {
    return null; // Return null if we want to hide the Navbar
  }

  return (
    <nav className="navbar">
      <ul className="navbar-left">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <div className="navbar-title">
        <h1>vibecheck</h1>
      </div>
      <ul className="navbar-right">
        <li>
          <Link to="/socials">Socials</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
