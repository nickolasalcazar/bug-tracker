import * as React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import NavBar from "./NavBar";
import LeftDrawer from "./LeftDrawer";

const drawerWidth = 240;

export default function NavbarWithDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileMenuId = "profile-menu";

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
        <Toolbar />
        <Box component="main">{props.children}</Box>
      </Box>
      <ProfileMenu
        anchorEl={anchorEl}
        menuId={profileMenuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </Box>
  );
}
