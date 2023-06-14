import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

import {
  Avatar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { NavLink } from "react-router-dom";

export default function ProfileNavButton(props) {
  const { isAuthenticated, user } = useAuth0();

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
    <>
      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        onClick={handleOpen}
        color="inherit"
      >
        <Avatar src={user.picture} alt={user.nickname} />
      </IconButton>
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
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
function ProfileMenu({ anchorEl, menuId, isOpen, handleClose }) {
  const { userProfile } = useUserProfile();

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
      <MenuItem
        onClick={handleClose}
        sx={{ display: { md: "none", sm: "none" } }}
      >
        <NavLink to="/dashboard">Dashboard</NavLink>
      </MenuItem>
      {userProfile === null ? null : (
        <MenuItem onClick={handleClose}>
          <NavLink to={`/user/${userProfile.username}`}>Profile</NavLink>
        </MenuItem>
      )}
      <MenuItem>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
}
