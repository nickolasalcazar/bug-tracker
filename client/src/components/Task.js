import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { createTask, getTaskById } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

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
    console.log(`Task ${id}; fetch its data`);
    getTask().then((response) => {
      console.log(response.data[0]);
      setData(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Typography component="h2">Loading task...</Typography>;

  return (
    <List>
      <ListItem>
        <Typography variant="h6" component="h2">
          {data.title}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <Typography variant="p" sx={{ pt: 2, pb: 4 }}>
          {data.description}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <InboxIcon />
            <Typography pl={1} variant="subtitle2">
              Creator
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText primary={`${data.creator} (${data.date_created})`} />
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <InboxIcon />
            <Typography pl={1} variant="subtitle2">
              Subscribers
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText primary="John Doe" />
        </Box>
      </ListItem>
      <Divider />
    </List>
  );
}

export default Task;
