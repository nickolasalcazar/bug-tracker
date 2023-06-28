import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreenRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

/**
 * Renders options for editing, closing, and expanding a task.
 */
export default function TaskHeader({
  data,
  expanded,
  setExpanded,
  handleClose,
  handleDelete = null,
}) {
  const TaskID = () => (
    <Box sx={{ flex: 1, display: "flex", alignContent: "center" }}>
      <Typography
        sx={{
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        component="p"
      >
        <TaskIcon fontSize="small" sx={{ pr: 0.5, pt: "2.5px" }} />
        {data.task_id ?? "New Task"}
      </Typography>
    </Box>
  );

  const iconStyle = {
    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 1,
      }}
    >
      <TaskID />
      {data.task_id && handleDelete ? (
        <>
          <Button
            component={Link}
            onClick={handleDelete}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Delete
          </Button>
          <Button
            component={Link}
            to={`/dashboard/task/form/${data.task_id}`}
            color="secondary"
            variant="contained"
            size="small"
          >
            Edit
          </Button>
        </>
      ) : null}
      {expanded ? (
        <IconButton onClick={() => setExpanded(false)} sx={iconStyle}>
          <CloseFullscreenIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setExpanded(true)} sx={iconStyle}>
          <FullscreenIcon />
        </IconButton>
      )}
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
