import React, { useEffect } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Chip, Container, Stack, Tab, Tabs } from "@mui/material";
import useGetUserByParam from "../../hooks/useGetUserByParam";
import useConnections from "../../hooks/useConnections";
import usePendingConnections from "../../hooks/usePendingConnections";
import ConnectionButton from "./ConnectionButton";
import UserList from "./UserList";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { user: userAuth0 } = useAuth0();
  const { user, isLoading, error, refreshUser } = useGetUserByParam();
  const { pendingConnections, reloadPendingConnections } =
    usePendingConnections();
  const { connections, reloadConnections } = useConnections(user?.username);

  const [tabIndex, setTabIndex] = React.useState(0);
  const matchConn = useMatch("/user/:user/connections");
  const matchReqs = useMatch("/user/:user/requests");

  const refreshUserComponent = () => {
    reloadConnections();
    reloadPendingConnections();
    refreshUser();
  };

  useEffect(() => {
    if (isLoading || error) return;
    reloadConnections();
    reloadPendingConnections();
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
        <Stack direction="row" gap={1}>
          {/* Edit Profile temporarily disabled */}
          {/* {userAuth0.sub === user.user_id ? (
            <Chip variant="outlined" color="secondary" label="Edit" clickable />
          ) : null} */}
          <ConnectionButton user={user} refresh={refreshUserComponent} />
        </Stack>
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
          {user.user_id !== userAuth0.sub ? null : (
            <Tab label="Requests" component={Link} to="requests" />
          )}
        </Tabs>
        <Stack direction="column" alignItems="center">
          <Routes>
            <Route
              path=""
              element={
                <UserList
                  users={connections}
                  reloadConnections={refreshUserComponent}
                />
              }
            />
            <Route
              path="connections"
              element={
                <UserList
                  users={connections}
                  reloadConnections={refreshUserComponent}
                />
              }
            />
            {user.user_id !== userAuth0.sub ? null : (
              <Route
                path="requests"
                element={
                  <UserList
                    users={pendingConnections}
                    reloadConnections={refreshUserComponent}
                    options={{ pending: true, connected: false }}
                  />
                }
              />
            )}
          </Routes>
        </Stack>
      </Container>
    </Container>
  );
}
