import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import NotifNoneIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotifIcon from "@mui/icons-material/NotificationsActiveRounded";

/**
 * Renders a bell icon for accessing notifications.
 */
export default function NotificationBell({ display }) {
  const menuId = "notif-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="more navigation options"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
        sx={{ display: display }}
      >
        <NotifNoneIcon />
        {/* <NotifIcon /> */}
      </IconButton>
      <NotifMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}

/**
 * A menu that is rendered when NotificationBell is clicked.
 *
 * @param {any}       anchorEl
 * @param {string}    menuId
 * @param {bool}      isOpen
 * @param {function}  handleClose
 */
function NotifMenu({ anchorEl, menuId, isOpen, handleClose }) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={handleClose}
      sx={{
        mt: "45px",
      }}
    >
      <MenuItem>Notification</MenuItem>
      <MenuItem>Notification</MenuItem>
      <MenuItem>Notification</MenuItem>
      <MenuItem>Notification</MenuItem>
    </Menu>
  );
}
