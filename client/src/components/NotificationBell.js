import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotifNoneIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotifIcon from "@mui/icons-material/NotificationsActiveRounded";
import usePendingConnections from "../hooks/usePendingConnections";

/**
 * Renders a bell icon for accessing notifications.
 */
export default function NotificationBell({ display }) {
  const menuId = "notif-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    pendingConnections: connections,
    reloadPendingConnections: reloadConnections,
  } = usePendingConnections();

  const refreshBell = () => {
    reloadConnections();
  };

  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    refreshBell();
  };

  if (connections.length === 0) return null;
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        onClick={connections?.length === 0 ? null : handleOpen}
        color="inherit"
        sx={{ display: display }}
      >
        {connections?.length === 0 ? <NotifNoneIcon /> : <NotifIcon />}
      </IconButton>
      <NotifMenu
        options={{
          anchorEl: anchorEl,
          menuId: menuId,
          isOpen: isOpen,
          handleClose: handleClose,
        }}
        connections={connections}
      />
    </>
  );
}

/**
 * The menu that is rendered when NotificationBell is clicked.
 *
 * @param {any}       anchorEl
 * @param {string}    menuId
 * @param {bool}      isOpen
 * @param {function}  handleClose
 */
function NotifMenu({ options, connections }) {
  const Connections = () => {
    if (connections === null) return null;
    if (connections.length === 0) return null;
    return (
      <>
        {connections.map((connection, i) => (
          <MenuItem
            key={`connection-${i}`}
            component={Link}
            to={`/user/${connection.username}`}
            onClick={options.handleClose}
          >
            <ListItemIcon>
              <NotifIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography noWrap component="span">
                Connection request from{" "}
              </Typography>
              <Typography fontWeight="bold" noWrap component="span">
                @{connection.username}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </>
    );
  };

  return (
    <Menu
      anchorEl={options.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={options.menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={options.isOpen}
      onClose={options.handleClose}
      sx={{
        mt: "45px",
      }}
    >
      <MenuItem disabled divider>
        <Typography variant="subtitle1">Notifications</Typography>
      </MenuItem>
      <Connections />
    </Menu>
  );
}
