import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import NotificationBell from "./NotificationBell";
import ProfileNavButton from "./ProfileNavButton";
import { Link } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
const logoSize = "50px";

/**
 * The navigation bar that resides at the top of the application.
 *
 * @param {function} handleDrawerToggle
 */
export default function NavBar({ handleDrawerToggle }) {
  const { userProfile: user } = useUserProfile();
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
            <ToggleDrawer handleDrawerToggle={handleDrawerToggle} />
            <LogoFull />
          </Stack>
          <LogoSmall />
          <Stack direction="row" spacing={2}>
            <Box display={{ xs: "none", sm: "flex", md: "flex", lg: "flex" }}>
              <MenuItem component={Link} to="/dashboard">
                <Typography textAlign="center" fontWeight="medium">
                  Dashboard
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to={user === null ? "/user" : `/user/${user.username}`}
              >
                <Typography textAlign="center" fontWeight="medium">
                  Profile
                </Typography>
              </MenuItem>
            </Box>
            <NotificationBell />
            <ProfileNavButton />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const ToggleDrawer = ({ handleDrawerToggle }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ display: { xl: "none" } }}
  >
    <MenuIcon fontSize="large" />
  </IconButton>
);

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
