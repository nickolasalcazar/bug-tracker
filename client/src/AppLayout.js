import React, { useState } from "react";
import { Box, CssBaseline, Toolbar as ToolbarPadding } from "@mui/material";
import ProfileMenu from "./components/NavigationUI/ProfileMenu";
import NavBar from "./components/NavigationUI/NavBar";
import LeftDrawer from "./components/NavigationUI/LeftDrawer";

// const drawerWidth = 200;
const drawerWidth = 185;

/**
 * Renders the main layout of the app, rendering components such as NavBar,
 * LeftDrawer, and the main content of the app contained in <main />.
 */
export default function AppLayout({ children, disableDrawer }) {
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
      {disableDrawer ? null : (
        <LeftDrawer
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
        />
      )}
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 1,
          px: {
            xs: 0,
            sm: 0,
            md: 1,
          },
          // width: { sm: `calc(100% - ${drawerWidth}px)` }, // Not sure what effect this has on styling
        }}
      >
        <ToolbarPadding />
        {children}
      </Box>
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={profileMenuId}
        isMenuOpen={isProfileMenuOpen}
        handleMenuClose={handleProfileMenuClose}
      />
    </Box>
  );
}
