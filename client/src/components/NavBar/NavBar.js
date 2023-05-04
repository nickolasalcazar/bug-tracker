import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./NavBar.css";

import ProfilePic from "../ProfilePic";
import LoginButton from "../Login";
import LogoutButton from "../Logout";
import SignupButton from "../SignUp";

function NavBar() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink exact="true" to="/">
            <img
              src="https://mugbug-public-assets.s3.us-west-1.amazonaws.com/logo-icon-v3-alt.png"
              style={{ width: "50px" }}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <LogoutButton />
            </li>
            <li>
              <NavLink to="/profile">
                <ProfilePic src={user.picture} alt={user.nickname} />
              </NavLink>
            </li>
          </>
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
