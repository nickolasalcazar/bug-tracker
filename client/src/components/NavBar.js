import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact="true" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/auth-test">Auth</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
          <img />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
