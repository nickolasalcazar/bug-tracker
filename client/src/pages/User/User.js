import React, { useEffect } from "react";
import { Avatar, Container, Stack } from "@mui/material";
import useGetUserByParam from "../../hooks/useGetUserByParam";
import ConnectionButton from "./ConnectionButton";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { user, isLoading, error, refreshUser } = useGetUserByParam();

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
        alignItems: "center",
        gap: 1,
      }}
    >
      <Avatar src={user.picture} sx={{ width: 100, height: 100 }} />
      <h2>{user.nickname}</h2>
      <h3>@{user.username}</h3>
      <ConnectionButton user={user} refreshUser={refreshUser} />
    </Container>
  );
}
