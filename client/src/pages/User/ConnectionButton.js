import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Chip } from "@mui/material";
import useConnections from "../../hooks/useConnections";

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

  // Add yser to components; React sees no change
  if (loggedInUser.sub === user.user_id) return null;
  else if (status === "not connected") {
    return (
      <Chip
        key={`${user.username} ${status}`}
        label="Connect"
        color="secondary"
        clickable
        onClick={handleAdd}
      />
    );
  } else if (status === "connected") {
    return (
      <Chip
        key={`${user.username} ${status}`}
        label="Connected"
        color="secondary"
        clickable
        onClick={handleRemove}
      />
    );
  } else if (status === "sent request") {
    return (
      <Chip
        key={`${user.username} ${status}`}
        label="Cancel Request"
        color="secondary"
        variant="outlined"
        clickable
        onClick={handleRemove}
      />
    );
  } else if (status === "received request") {
    return (
      <Chip
        key={`${user.username} ${status}`}
        label="Received Connection (Accept)"
        color="secondary"
        clickable
        onClick={handleAccept}
      />
    );
  }
}
