import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/MenuRounded";
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { NavLink } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import ProfileNavButton from "../ProfileNavButton";
import useUserProfile from "../../hooks/useUserProfile";

const logoSize = "50px";

/**
 * The navigation bar that resides at the top of the application.
 *
 * @param {function} handleDrawerToggle
 */
export default function NavBar({ handleDrawerToggle }) {
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
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xl: "none" } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <LogoFull />
          </Stack>
          <LogoSmall />
          <Stack direction="row" spacing={1}>
            <NotificationBell />
            <ProfileNavButton />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const LogoFull = () => (
  <>
    <Box
      component="img"
      src="/logo-icon-dark.png"
      width={logoSize}
      height={logoSize}
      sx={{ display: { xs: "none", sm: "block", md: "block" } }}
    />
    <Box
      component="img"
      src="/logo-text-alt.png"
      sx={{
        width: "auto",
        height: logoSize,
        pt: "3px",
        display: { xs: "none", sm: "block", md: "block" },
      }}
    />
  </>
);

const LogoSmall = () => (
  <Box
    component="img"
    src="/logo-icon-dark.png"
    width={logoSize}
    height={logoSize}
    sx={{ display: { xs: "block", sm: "none", md: "none" } }}
  />
);
