import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../App";

function NavBar() {
  const user = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact="true" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
          <img />
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
