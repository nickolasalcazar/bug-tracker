import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotifNoneIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotifIcon from "@mui/icons-material/NotificationsActiveRounded";
import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./Logout";
import LogoutIcon from "@mui/icons-material/LogoutRounded";

export default function ProfileNavButton({ sx }) {
  const { userProfile: user } = useUserProfile();

  const menuId = "profile-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        onClick={handleOpen}
        color="inherit"
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <NotifIcon
              fontSize="small"
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                },
              }}
            />
          }
        >
          <Avatar
            src={user === null ? null : user.picture}
            alt={user === null ? null : user.nickname}
          />
        </Badge>
      </IconButton>
      <ProfileMenu
        user={user}
        anchorEl={anchorEl}
        menuId={menuId}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </Box>
  );
}

/**
 * A menu that is rendered when ProfileNavButton is clicked.
 *
 * @param {any}       anchorEl
 * @param {string}    menuId
 * @param {bool}      isOpen
 * @param {function}  handleClose
 */
function ProfileMenu({ user, anchorEl, menuId, isOpen, handleClose }) {
  if (user === null) return;
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
      <NavLink to="/dashboard" ml={2}>
        <MenuItem onClick={handleClose} divider>
          <ListItemIcon>
            <NotifNoneIcon fontSize="small" />
          </ListItemIcon>
          Notifications
        </MenuItem>
      </NavLink>
      <NavLink to={`/user/${user.username}`} ml={2}>
        <MenuItem onClick={handleClose} divider>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
      </NavLink>
      <MenuItem>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
}
