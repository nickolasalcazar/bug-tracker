import * as React from "react";
import { Box, CssBaseline, Toolbar as ToolbarPadding } from "@mui/material";
import ProfileMenu from "./components/NavigationUI/ProfileMenu";
import NavBar from "./components/NavigationUI/NavBar";
import LeftDrawer from "./components/NavigationUI/LeftDrawer";

const drawerWidth = 240;

/**
 * Renders the main layout of the app, rendering components such as NavBar,
 * LeftDrawer, and the main content of the app contained in <main />.
 */
export default function AppLayout({ children, disableDrawer }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const profileMenuId = "profile-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);
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
          flexGrow: 1,
          // p: 3,
          pt: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <ToolbarPadding />
        <Box component="main">{children}</Box>
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
