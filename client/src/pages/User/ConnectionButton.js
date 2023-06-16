import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import useConnections from "../../hooks/useConnections";

import AddUserIcon from "@mui/icons-material/PersonAddRounded";
import RemoveUserIcon from "@mui/icons-material/PersonRemoveRounded";
import CancelIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * A button for adding, accepting, or removing a connection request.
 *
 * @param {object}    user    Object that contains details about the user.
 * @param {function}  refresh Function for reloading parent state.
 */
export default function ConnectionButton({ user, refresh }) {
  const { user: loggedInUser } = useAuth0();
  const { addConnection, removeConnection, acceptConnection } =
    useConnections();

  const [status, setStatus] = useState(checkStatus());

  function checkStatus() {
    if (user.connected === null) return "not connected";
    else if (user.connected === true) return "connected";
    else if (user.connection_pending === true)
      if (user.sender === loggedInUser.sub) return "sent request";
      else return "received request";
  }

  useEffect(() => {
    setStatus(checkStatus);
  }, [user]);

  const handleAdd = async () => {
    if (await addConnection(user.user_id)) {
      setStatus("sent request");
      refresh();
    }
  };

  const handleAccept = async () => {
    if (await acceptConnection(user.user_id)) {
      setStatus("request received");
      refresh();
    }
  };

  const handleRemove = async () => {
    if (await removeConnection(user.user_id)) {
      setStatus("not connected");
      refresh();
    }
  };

  const Connected = () => {
    return (
      <Chip
        label="Connected (Manage Connection)"
        color="secondary"
        clickable
        onClick={handleRemove}
      />
    );
  };

  const NotConnected = () => {
    return (
      <Chip
        label="Connect"
        color="secondary"
        clickable
        onClick={handleAdd}
        icon={<AddUserIcon />}
      />
    );
  };

  const SentRequest = () => {
    return (
      <Chip
        label="Cancel Request"
        variant="outlined"
        clickable
        onClick={handleRemove}
        icon={<CancelIcon />}
      />
    );
  };

  const ReceivedRequest = () => {
    return (
      <Stack direction="column" spacing={1}>
        <Typography variant="body2" textAlign="center">
          Connection Request:
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label="Decline"
            variant="outlined"
            color="primary"
            clickable
            onClick={handleRemove}
            icon={<CancelIcon />}
          />
          <Chip
            label="Accept Connection"
            variant="contained"
            color="secondary"
            clickable
            onClick={handleAccept}
            icon={<AddUserIcon />}
          />
        </Stack>
      </Stack>
    );
  };

  if (loggedInUser.sub === user.user_id) return null;
  return (
    <Box key={`${user.username} ${status}`}>
      {status === "connected" ? <Connected /> : null}
      {status === "not connected" ? <NotConnected /> : null}
      {status === "sent request" ? <SentRequest /> : null}
      {status === "received request" ? <ReceivedRequest /> : null}
    </Box>
  );

  // if (status === "not connected") {
  //   return (
  //     <Chip
  //       key={`${user.username} ${status}`}
  //       label="Connect"
  //       color="secondary"
  //       clickable
  //       onClick={handleAdd}
  //     />
  //   );
  // } else if (status === "connected") {
  //   return (
  //     <Chip
  //       key={`${user.username} ${status}`}
  //       label="Connected"
  //       color="secondary"
  //       clickable
  //       onClick={handleRemove}
  //     />
  //   );
  // } else if (status === "sent request") {
  //   return (
  //     <Chip
  //       key={`${user.username} ${status}`}
  //       label="Cancel Request"
  //       color="secondary"
  //       variant="outlined"
  //       clickable
  //       onClick={handleRemove}
  //     />
  //   );
  // } else if (status === "received request") {
  //   return (
  //     <Chip
  //       key={`${user.username} ${status}`}
  //       label="Received Connection (Accept)"
  //       color="secondary"
  //       clickable
  //       onClick={handleAccept}
  //     />
  //   );
  // }
}
