import * as React from "react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import SignupButton from "./SignUp";

export default function NavBar() {
  const { isAuthenticated, user } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
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
    >
      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/profile">Profile</NavLink>
      </MenuItem>
      <MenuItem>
        <LogoutButton />
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <></>
    // <Menu
    //   anchorEl={mobileMoreAnchorEl}
    //   anchorOrigin={{
    //     vertical: "top",
    //     horizontal: "right",
    //   }}
    //   id={mobileMenuId}
    //   keepMounted
    //   transformOrigin={{
    //     vertical: "top",
    //     horizontal: "right",
    //   }}
    //   open={isMobileMenuOpen}
    //   onClose={handleMobileMenuClose}
    // >
    //   <MenuItem>
    //     <IconButton size="large" aria-label="show 4 new mails" color="inherit">
    //       <Badge badgeContent={4} color="error">
    //         <MailIcon />
    //       </Badge>
    //     </IconButton>
    //     <p>Messages</p>
    //   </MenuItem>
    //   <MenuItem>
    //     <IconButton
    //       size="large"
    //       aria-label="show 17 new notifications"
    //       color="inherit"
    //     >
    //       <Badge badgeContent={17} color="error">
    //         <NotificationsIcon />
    //       </Badge>
    //     </IconButton>
    //     <p>Notifications</p>
    //   </MenuItem>
    //   <MenuItem onClick={handleProfileMenuOpen}>
    //     <IconButton
    //       size="large"
    //       aria-label="account of current user"
    //       aria-controls="primary-search-account-menu"
    //       aria-haspopup="true"
    //       color="inherit"
    //     >
    //       <AccountCircle />
    //     </IconButton>
    //     <p>Profile</p>
    //   </MenuItem>
    // </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#25292f" }}>
        <Toolbar>
          <img
            src="https://mugbug-public-assets.s3.us-west-1.amazonaws.com/logo-icon-v3-alt.png"
            style={{ width: "50px" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            {isAuthenticated ? (
              <>
                <Button>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar src={user.picture} alt={user.nickname} />
                </IconButton>
              </>
            ) : (
              <>
                <Button>
                  <LoginButton />
                </Button>
                <Button>
                  <SignupButton />
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
