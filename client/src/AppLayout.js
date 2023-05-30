import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Toolbar as ToolbarPadding,
} from "@mui/material";
import ProfileMenu from "./components/NavigationUI/ProfileMenu";
import NavBar from "./components/NavigationUI/NavBar";
import LeftDrawer from "./components/NavigationUI/LeftDrawer";

// const drawerWidth = 200;
const drawerWidth = 185;

/**
 * Renders the main layout of the app, rendering components such as NavBar,
 * LeftDrawer, and the main content of the app contained in <main />.
 */
// export default function AppLayout({ children, disableDrawer }) {
export default function AppLayout({ children, renderLeftDrawer = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const profileMenuId = "profile-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar
        handleDrawerToggle={handleDrawerToggle}
        profileMenuId={profileMenuId}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      {!renderLeftDrawer ? null : (
        <LeftDrawer
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
        />
      )}
      <Container
        disableGutters
        component="main"
        maxWidth="100%"
        sx={{
          p: 1,
          px: { xs: 0, sm: 1 },
        }}
      >
        <ToolbarPadding />
        {children}
      </Container>
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={profileMenuId}
        isMenuOpen={isProfileMenuOpen}
        handleMenuClose={handleProfileMenuClose}
      />
    </Box>
  );
}
