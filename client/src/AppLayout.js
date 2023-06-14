import { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Toolbar as ToolbarPadding,
} from "@mui/material";
import NavBar from "./components/NavigationUI/NavBar";
import LeftDrawer from "./components/NavigationUI/LeftDrawer";

const drawerWidth = 185;

/**
 * Renders the main layout of the app, rendering components such as NavBar,
 * LeftDrawer, and the main content of the app contained in <main />.
 */
export default function AppLayout({ children, renderLeftDrawer = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} />
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
        <Box pt={{ xs: 1, sm: 0 }}>{children}</Box>
      </Container>
    </Box>
  );
}
