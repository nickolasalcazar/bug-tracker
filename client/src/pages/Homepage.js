import React from "react";

import Auth0Wrapper from "../components/auth0/Auth0Wrapper";
import LoginButton from "../components/auth0/LoginButton";
import LogoutButton from "../components/auth0/LogoutButton";

function Homepage({}) {
  return (
    <div>
      <h1>Homepage</h1>
      {/* <p>{message}</p> */}
      <Auth0Wrapper>
        <LoginButton />
        <LogoutButton />
      </Auth0Wrapper>
    </div>
  );
}

export default Homepage;
