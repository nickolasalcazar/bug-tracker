import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";

import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

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
        <Avatar
          src={user === null ? null : user.picture}
          alt={user === null ? null : user.nickname}
        />
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
      {user === null ? null : (
        <NavLink to={`/user/${user.username}`} ml={2}>
          <MenuItem onClick={handleClose} divider>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </NavLink>
      )}
      <MenuItem>
        {user === null ? (
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
        ) : (
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
        )}
        {user === null ? <LoginButton /> : <LogoutButton />}
      </MenuItem>
    </Menu>
  );
}
