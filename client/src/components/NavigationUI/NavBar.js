import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/MenuRounded";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Button, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login";
import SignupButton from "../SignUp";

/**
 * The navigation bar that resides at the top of the application.
 *
 * @param {function} handleDrawerToggle
 * @param {string} profileMenuId
 * @param {function} handleProfileMenuOpen
 */
function NavBar({ handleDrawerToggle, profileMenuId, handleProfileMenuOpen }) {
  const { isAuthenticated, user } = useAuth0();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box
          display="flex"
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Stack direction="row" spacing={1}>
            <img
              src="logo-icon-dark.png"
              style={{ width: "50px", height: "50px" }}
            />
            <Box
              sx={{
                pt: "3px",
                display: { sm: "block", xs: "none" },
              }}
            >
              <img
                src="logo-text-alt.png"
                style={{ width: "auto", height: "50px" }}
              />
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            {isAuthenticated ? (
              <>
                <Button sx={{ display: { sm: "block", xs: "none" } }}>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="more navigation options"
                  aria-controls={profileMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar src={user.picture} alt={user.nickname} />
                </IconButton>
              </>
            ) : (
              <>
                <Button sx={{ display: { sm: "block", xs: "none" } }}>
                  <LoginButton />
                </Button>
                <Button sx={{ display: { sm: "block", xs: "none" } }}>
                  <SignupButton />
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="more navigation options"
                  aria-controls={profileMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
              </>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
