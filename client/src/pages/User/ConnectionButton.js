import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup, Menu, MenuItem, Typography } from "@mui/material";
import AddUserIcon from "@mui/icons-material/PersonAddRounded";
import RemoveUserIcon from "@mui/icons-material/PersonRemoveRounded";
import CancelIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  addConnection,
  acceptConnection,
  removeConnection,
} from "../../services/user.api";

const WIDTH = 165;

/**
 * Button for requesting, accepting/rejecting to connect with another user.
 */
export default function ConnectionButton({ user, refreshUser }) {
  const { getAccessTokenSilently, user: loggedInUser } = useAuth0();

  // If the profile belongs to logged in user, return null
  if (user.user_id === loggedInUser.sub) return null;

  const handleAddConnection = async () => {
    console.log("handleAddConnection");
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await addConnection(accessToken, user.user_id);
      console.log("response", response);
      refreshUser();
    } catch (e) {}
  };

  const handleAcceptConnection = async () => {
    console.log("handleAcceptConnection");
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await acceptConnection(accessToken, user.user_id);
      console.log("response", response);
      refreshUser();
    } catch (e) {}
  };

  // Handle rejecting & removing a connection
  const handleRemoveConnection = async () => {
    console.log("handleRemoveConnection");
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await removeConnection(accessToken, user.user_id);
      console.log("response", response);
      refreshUser();
    } catch (e) {}
  };

  const options = {
    notConnected: {
      key: "notConnected",
      handler: handleAddConnection,
      label: "Connect",
      icon: <AddUserIcon />,
      variant: "contained",
      disabled: false,
    },
    connected: {
      key: "connected",
      handler: handleRemoveConnection,
      label: "Remove Connection",
      icon: <RemoveUserIcon />,
      variant: "contained",
      disabled: false,
    },
    respond: {
      key: "respond",
      handler: handleAcceptConnection,
      label: "Respond",
      icon: <AddUserIcon />,
      variant: "contined",
      disabled: false,
    },
    pending: {
      key: "pending",
      // handler: null,
      handler: handleRemoveConnection,
      // label: "Requested",
      label: "Cancel Request",
      icon: <CancelIcon />,
      variant: "outlined",
      disabled: false,
    },
  };

  let option;

  console.log(user);

  if (user.connected === null) option = options.notConnected;
  else if (user.connected === true) option = options.connected;
  else if (user.connection_pending === true)
    if (user.sender === loggedInUser.sub) option = options.pending;
    else option = options.respond;

  // console.log("option", option);

  const RespondButton = () => {
    return (
      <ButtonGroup
        variant="contained"
        color="secondary"
        size="small"
        style={{
          maxWidth: WIDTH * 2,
          minWidth: WIDTH * 2,
        }}
      >
        <Button
          onClick={handleRemoveConnection}
          variant="outlined"
          style={{
            maxWidth: WIDTH - 50,
            minWidth: WIDTH - 50,
          }}
        >
          Ignore
        </Button>
        <Button
          onClick={handleAcceptConnection}
          startIcon={options.notConnected.icon}
          style={{
            maxWidth: WIDTH + 50,
            minWidth: WIDTH + 50,
          }}
        >
          Accept Connection
        </Button>
      </ButtonGroup>
    );
  };

  const ConnectedButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            maxWidth: WIDTH,
            minWidth: WIDTH,
          }}
        >
          Connected
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleRemoveConnection();
              handleClose();
            }}
            disableRipple
          >
            <RemoveUserIcon pr={3} />
            <Typography pl={2}>Remove</Typography>
          </MenuItem>
        </Menu>
      </>
    );
  };

  if (option.key === "respond") return <RespondButton />;
  else if (option.key === "connected") return <ConnectedButton />;
  else
    return (
      <Button
        onClick={option.handler}
        variant={option.variant}
        color="secondary"
        endIcon={option.icon}
        size="small"
        disabled={option.disabled}
        style={{
          maxWidth: WIDTH,
          minWidth: WIDTH,
        }}
      >
        {option.label}
      </Button>
    );
}
