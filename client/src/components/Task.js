import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { getTaskById } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";

import TaskIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutlineRounded";
// import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import OpenInNewIcon from "@mui/icons-material/OpenInNewRounded";
import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreenRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";

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
      console.log("getTask", response.data);
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
        <Box
          sx={{
            width: "100%",
            height: 30,
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
          <Button
            component={Link}
            to={`/dashboard/task/${data.task.task_id}/edit`}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Discard
          </Button>
          <Button
            component={Link}
            to={`/dashboard/task/${data.task.task_id}/edit`}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Edit
          </Button>
          {renderTable ? (
            <IconButton onClick={() => setRenderTable(false)}>
              <FullscreenIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setRenderTable(true)}>
              <CloseFullscreenIcon />
            </IconButton>
          )}
          <IconButton
            component={Link}
            to="/dashboard"
            onClick={() => setRenderTable(true)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </ListItem>
      <ListItem sx={{ pb: 0 }}>
        <Typography variant="h6" component="h2" fontWeight="medium">
          {data.task.title}
        </Typography>
      </ListItem>
      <ListItem>
        <Stack direction="row" spacing={1}>
          <Chip size="small" label={`Status: ${data.task.status}`} />
          <Chip size="small" label={`Priority: ${data.task.priority}`} />
        </Stack>
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
        <Box width="60%" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {data.subscribers.map((subsciber, index) => (
            <Chip
              key={index}
              icon={<AccountCircleIcon />}
              label={truncateString(subsciber.username, 15)}
              variant="outlined"
              onClick={() => console.log("chip")}
              size="small"
            />
          ))}
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <TagIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Tags
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {["Tag 1", "Tag 2", "Tag 3"].map((tag, index) => (
            <Chip
              key={index}
              label={truncateString(tag, 15)}
              variant="outlined"
              onClick={() => console.log("chip")}
              size="small"
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
          <ListItemText
            primary={
              <Typography fontSize="14px" component="p">
                Subtasks go here
              </Typography>
            }
          />
        </Box>
      </ListItem>
      <Divider />
      <ListItem>
        <Box width="40%">
          <ListItemIcon sx={{ pt: 1 }}>
            <CalendarIcon />
            <Typography pl={1} variant="subtitle2" component="p">
              Timeframe
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText
            primary={
              <Typography fontSize="14px" component="p">
                06/02/2023 - 06/02/2023
              </Typography>
            }
          />
        </Box>
      </ListItem>
    </List>
  );
}

export default Task;
