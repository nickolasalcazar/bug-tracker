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
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          listStyle: "none",
        }}
      >
        <img
          src="https://mugbug-public-assets.s3.us-west-1.amazonaws.com/logo-icon-v3.png"
          style={{ width: "80px" }}
        />
        <li>
          <NavLink exact="true" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        {/* <li>
          <NavLink to="/protected-page">Protected Page</NavLink>
        </li> */}
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
