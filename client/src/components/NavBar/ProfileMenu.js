import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import LogoutButton from "../Logout";

/**
 * The meny that is rendered when the profile picture of the NavBar is clicked.
 *
 * @param {any}       anchorEl
 * @param {string}    menuId
 * @param {bool}      isMenuOpen
 * @param {function}  handleMenuClose
 */
export default function ProfileMenu({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
}) {
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
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        mt: "45px",
      }}
    >
      <MenuItem
        onClick={handleMenuClose}
        sx={{ display: { md: "none", sm: "none" } }}
      >
        <NavLink to="/dashboard">Dashboard</NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/profile">Profile</NavLink>
      </MenuItem>
      <MenuItem>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
}
