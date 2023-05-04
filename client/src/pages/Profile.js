import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import ProfilePic from "../components/ProfilePic";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <h1>Profile</h1>
      <ProfilePic src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <br />
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  ) : (
    <p>isAuthenticated === false</p>
  );
}
