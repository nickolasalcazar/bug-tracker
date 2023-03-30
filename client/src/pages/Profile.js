import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Auth0Wrapper from "../components/auth0/Auth0Wrapper";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Auth0Wrapper>
      {isAuthenticated ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <h1>Please Sign in</h1>
      )}
    </Auth0Wrapper>
  );
};

export default Profile;
