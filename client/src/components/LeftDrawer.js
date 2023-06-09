import { useContext } from "react";
import { Link } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar as ToolbarPadding,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import AddIcon from "@mui/icons-material/Add";
import AllIcon from "@mui/icons-material/ListRounded";

/**
 * Renders the left drawer that should appear in the Dashboard page.
 *
 * @param {number}    drawerWidth
 * @param {boolean}   mobileOpen
 * @param {function}  handleDrawerToggle
 */
export default function LeftDrawer({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) {
  const { updateTasksContext } = useContext(TasksContext);
  const drawer = (
    <>
      <ToolbarPadding />
      <List sx={{ mt: { xs: 1, sm: 0 } }}>
        <ListItem component={Link} to="/task/new">
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            size="large"
            startIcon={<AddIcon />}
            sx={{
              minWidth: "100%",
              mb: 1,
            }}
          >
            NEW TASK
          </Button>
        </ListItem>
        <Divider />
        {/* TODO */}
        {/* <ListItem
          disablePadding
          component={Link}
          to="/dashboard"
          onClick={() => {
            updateTasksContext("all");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AllIcon />
            </ListItemIcon>
            <ListItemText primary={"All Tasks"} />
          </ListItemButton>
        </ListItem> */}
        <ListItem
          disablePadding
          component={Link}
          to="/dashboard"
          onClick={() => {
            updateTasksContext("owned");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"My Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          component={Link}
          to="/dashboard"
          onClick={() => {
            updateTasksContext("subscribed");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SubscriberIcon />
            </ListItemIcon>
            <ListItemText primary={"Subscribed"} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { xl: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The two Drawer elements below can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        // container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
