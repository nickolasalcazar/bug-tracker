import * as React from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import TaskIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import ProjectIcon from "@mui/icons-material/MenuBookRounded";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

/**
 * A button that renders menu when clicked.
 */
export default function NewButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="90%" mb={1} mx={1}>
      <Button
        id="new-button-button"
        aria-controls={open ? "new-button-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="secondary"
        variant="contained"
        disableElevation
        onClick={handleClick}
        size="large"
        startIcon={<AddIcon />}
        fullWidth={true}
        sx={{
          width: "100%",
          minWidth: "100%",
        }}
      >
        New
      </Button>
      <StyledMenu
        id="new-button-menu"
        MenuListProps={{
          "aria-labelledby": "new-button-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <TaskIcon />
          <Link to="/dashboard/task/form">Task</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ProjectIcon />
          Project
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}
