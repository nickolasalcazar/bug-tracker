import * as React from "react";
import { Box, CssBaseline, Toolbar as ToolbarPadding } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import NavBar from "./NavBar";
import LeftDrawer from "./LeftDrawer";

const drawerWidth = 240;

export default function NavbarWithDrawer(props) {
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
      <LeftDrawer
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <ToolbarPadding />
        <Box component="main">{props.children}</Box>
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
