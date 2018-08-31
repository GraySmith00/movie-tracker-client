import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = ({ logoutUser }) => {
  return (
    <nav className="nav-btns">
      <NavLink exact to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink exact to="/login" className="nav-link">
        Login
      </NavLink>
      <NavLink exact to="/register" className="nav-link">
        Sign Up
      </NavLink>
      <NavLink exact to="/" className="nav-link" onClick={logoutUser}>
        Logout
      </NavLink>
      <NavLink exact to="/favorites" className="nav-link">
        Favorites
      </NavLink>
    </nav>
  );
};
