import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import LinkIcon from "@mui/icons-material/InsertLinkOutlined";
import CompletedIcon from "@mui/icons-material/CheckCircle";
import IncompleteIcon from "@mui/icons-material/RadioButtonUnchecked";

/**
 * Renders a chip that provides a name, status, and link to the task.
 */
export default function TaskChip({ id, title, status = null }) {
  let icon;
  if (status === null) icon = <LinkIcon fontSize="small" />;
  else if (status === "in progress") icon = <IncompleteIcon fontSize="small" />;
  else icon = <CompletedIcon fontSize="small" />;
  return (
    <Link to={`/dashboard/task/${id}`}>
      <Chip
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
          },
        }}
        clickable
        label={title}
        icon={icon}
        variant="outlined"
        color="secondary"
      />
    </Link>
  );
}
