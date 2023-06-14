import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useUserProfile from "../hooks/useUserProfile";
import LogoutButton from "./Logout";
import LoginButton from "./Login";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

export default function ProfileNavButton(props) {
  const { isAuthenticated, userAuth0 } = useAuth0();
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

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <>
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
      <MenuItem
        onClick={handleClose}
        sx={{ display: { md: "none", sm: "none" } }}
      >
        <NavLink to="/dashboard">Dashboard</NavLink>
      </MenuItem>
      {user === null ? null : (
        <MenuItem onClick={handleClose}>
          <NavLink to={`/user/${user.username}`}>Profile</NavLink>
        </MenuItem>
      )}
      <MenuItem>
        <LogoutButton />
      </MenuItem>
    </Menu>
  );
}
