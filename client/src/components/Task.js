import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { getTaskById } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";

import TaskIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutlineRounded";
// import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import OpenInNewIcon from "@mui/icons-material/OpenInNewRounded";
import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreenRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";

/**
 * Component that displays all of the details of a task.
 */
function Task({ setRenderTable = undefined, renderTable = undefined }) {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTask = async () => {
    const token = await getAccessTokenSilently();
    return await getTaskById(token, id);
  };

  // Listens for when a task ID is passed
  useEffect(() => {
    getTask().then((response) => {
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    });
  }, [id]);

  const truncateString = (str, len) =>
    str.length > len + 3 ? str.slice(0, len) + "..." : str;

  const ButtonLink = ({ to, children, onClick }) => (
    <Link
      onClick={onClick}
      to={to}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Link>
  );

  if (loading) return <Typography component="h2">Loading task...</Typography>;

  return (
    <List>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "center",
            gap: 1,
          }}
        >
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
              {data.task.task_id}
            </Typography>
          </Box>
          <ButtonGroup size="small">
            <Button color="secondary" variant="contained">
              <ButtonLink>Discard</ButtonLink>
            </Button>
            <Button color="secondary" variant="contained">
              <ButtonLink to={`/dashboard/task/${data.task.task_id}/edit`}>
                Edit
              </ButtonLink>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="small" color="secondary">
            {renderTable ? (
              <Button variant="contained" onClick={() => setRenderTable(false)}>
                <FullscreenIcon fontSize="small" />
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setRenderTable(true)}>
                <CloseFullscreenIcon fontSize="small" />
              </Button>
            )}
            <Button variant="contained">
              <ButtonLink to="/dashboard" onClick={() => setRenderTable(true)}>
                <CloseIcon fontSize="small" />
              </ButtonLink>
            </Button>
          </ButtonGroup>
        </Box>
      </ListItem>
      <ListItem sx={{ pb: 0 }}>
        <Typography variant="h6" component="h2" fontWeight="medium">
          {data.task.title}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography fontSize="14px" component="p">
          Progress, Priority, and 'Size' go here
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="p" sx={{ pt: 2, pb: 4 }}>
          {data.task.description}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <PersonIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Creator
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText
            primary={
              <Typography fontSize="14px" component="p">
                {data.task.creator} ({data.task.date_created})
              </Typography>
            }
          />
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <SubscriberIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Subscribers
            </Typography>
          </ListItemIcon>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, width: "60%" }}>
          {data.subscribers.map((subsciber, index) => (
            <Chip
              key={index}
              label={truncateString(subsciber.username, 15)}
              variant="outlined"
              onClick={() => console.log("chip")}
            />
          ))}
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <SubtasksIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Subtasks
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText primary="Subtasks listed here" />
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <SubtasksIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Subtasks
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText primary="Subtasks listed here" />
        </Box>
      </ListItem>
    </List>
  );
}

export default Task;
