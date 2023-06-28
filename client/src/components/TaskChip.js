import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import CompletedIcon from "@mui/icons-material/CheckCircle";
import IncompleteIcon from "@mui/icons-material/RadioButtonUnchecked";

/**
 * Renders a chip that renders the title, status, and link to the task.
 */
export default function TaskChip({ id, title, status = null }) {
  let icon;
  if (status === null) icon = <TaskIcon />;
  else if (status === "in progress") icon = <IncompleteIcon />;
  else icon = <CompletedIcon />;

  return (
    <Link to={`/dashboard/task/${id}`}>
      <ListItem disableGutters disablePadding dense>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} secondary={status ? status : null} />
      </ListItem>
    </Link>
  );
}
