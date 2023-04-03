import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from "../App";

import LoginButton from "./Login";
import LogoutButton from "./Logout";

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
        {/* <li>
          <NavLink to="/login">Login</NavLink>
        </li> */}
        <li>
          <LoginButton />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
