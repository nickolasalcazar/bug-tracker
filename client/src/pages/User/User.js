import React, { useEffect } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { Avatar, Box, Chip, Container, Stack, Tab, Tabs } from "@mui/material";
import useGetUserByParam from "../../hooks/useGetUserByParam";
import useNotifs from "../../hooks/useNotifs";
import useConnections from "../../hooks/useConnections";
import ConnectionButton from "./ConnectionButton";
import ConnectionList from "./ConnectionList";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { user, isLoading, error, refreshUser } = useGetUserByParam();
  const { notifs } = useNotifs();
  const { connections } = useConnections();

  const [tabIndex, setTabIndex] = React.useState(0);
  const matchConn = useMatch("/user/:user/connections");
  const matchReqs = useMatch("/user/:user/requests");

  useEffect(() => {
    console.log(notifs);
    console.log(connections);
  }, [notifs, connections]);

  useEffect(() => {
    if (isLoading || error) return;
  }, [user, isLoading]);

  useEffect(() => {
    const i = matchConn ? 0 : matchReqs ? 1 : 0;
    setTabIndex(i);
  }, [matchConn, matchReqs]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (isLoading) return <div>Loading profile...</div>;
  else if (error) return <div>{error}</div>;

  return (
    <Container sx={{ pt: 3 }}>
      <Stack direction="column" spacing={1} alignItems="center" pb={1}>
        <Avatar src={user.picture} sx={{ width: 100, height: 100 }} />
        <h2>{user.nickname}</h2>
        <h3>@{user.username}</h3>
        <Chip variant="outlined" color="secondary" label="Edit" clickable />
        <ConnectionButton user={user} refreshUser={refreshUser} />
      </Stack>
      <Container>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Connections" component={Link} to="connections" />
          <Tab label="Requests" component={Link} to="requests" />
        </Tabs>
        <Stack direction="column" alignItems="center">
          <Routes>
            <Route path="" element={<ConnectionList />} />
            <Route path="connections" element={<ConnectionList />} />
            <Route path="requests" element={<ConnectionList />} />
          </Routes>
        </Stack>
      </Container>
    </Container>
  );
}
