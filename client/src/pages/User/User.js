import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Container } from "@mui/material";

import useGetUserByUsername from "../../hooks/useGetUserByUsername";
import ConnectionButton from "./ConnectionButton";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { user: userAuth0 } = useAuth0();
  const { username } = useParams();
  const { user, isLoading, error } = useGetUserByUsername(username);
  const [isMe, setIsMe] = useState(false); // True if profile belongs to user

  useEffect(() => {
    if (isLoading || error) return;
    if (user.user_id === userAuth0.sub) setIsMe(true);

    console.log("user", user);
  }, [user, isLoading]);

  if (isLoading) return <div>Loading profile...</div>;
  else if (error) return <div>{error}</div>;

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Avatar src={user.picture} sx={{ width: 100, height: 100 }} />
      <h2>@{user.username}</h2>
      <h3>{user.nickname}</h3>
      <ConnectionButton user={user} />
    </Container>
  );
}
