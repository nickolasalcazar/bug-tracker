import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from "../App";

import LoginButton from "./Login";
import LogoutButton from "./Logout";
import SignupButton from "./SignUp";

function NavBar() {
  // const user = useContext(UserContext);
  const { isAuthenticated } = useAuth0();

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
        {isAuthenticated ? (
          <li>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li>
              <LoginButton />
            </li>

            <li>
              <SignupButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
