import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
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

import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutlineRounded";

/**
 * Component that displays all of the details of a task.
 */
function Task() {
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

  if (loading) return <Typography component="h2">Loading task...</Typography>;

  return (
    <List>
      <ListItem>
        <Typography variant="h6" component="h2">
          {data.task.title}
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
            <Typography pl={1} variant="subtitle2">
              Creator
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText
            primary={
              <Typography fontSize="14px">
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
            <Typography pl={1} variant="subtitle2">
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
            <Typography pl={1} variant="subtitle2">
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
            <Typography pl={1} variant="subtitle2">
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
