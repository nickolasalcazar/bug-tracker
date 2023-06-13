import React, { useEffect } from "react";
import { Avatar, Container } from "@mui/material";
import useGetUserByParam from "../../hooks/useGetUserByParam";
import ConnectionButton from "./ConnectionButton";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { user, isLoading, error } = useGetUserByParam();

  useEffect(() => {
    if (isLoading || error) return;
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
