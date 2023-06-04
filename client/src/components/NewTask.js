import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [data, setData] = useState({
    id: null,
    title: null,
    status: null,
    priority: null,
    description: null,
    subscribers: null,
    tags: null,
    subtasks: null, // array of ids
    date_start: null,
    date_end: null,
  });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    console.log(data);

    // const response = await createTask(accessToken, formData);
    // const response = await createTask(accessToken, data);
    // console.log(response);
  };

  if (loading) return <Typography component="h2">Loading task...</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <List component={"form"} onSubmit={handleSubmit}>
        <ListItem>
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
                ID
              </Typography>
            </Box>
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
        {/* Title field */}
        <ListItem>
          <TextField
            variant="standard"
            placeholder="Task title"
            size="medium"
            fullWidth
            required
          />
        </ListItem>
        {/* Status and Priority fields */}
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            maxWidth: 600,
            pb: 2,
          }}
        >
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Status"
              value={data.status ? data.status : ""}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, status: e.target.value };
                })
              }
            >
              {["in progress", "completed", "archived"].map((value, index) => (
                <MenuItem key={`${index}-status`} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              label="Priority"
              value={data.priority ? data.priority : ""}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, priority: e.target.value };
                })
              }
            >
              {["low", "medium", "high"].map((value, index) => (
                <MenuItem key={`${index}-priority`} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        <Divider />
        {/* Description field */}
        <ListItem>
          <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Enter task description"
            onChange={(e) => {
              setData((data) => {
                return {
                  ...data,
                  description: e.target.value,
                };
              });
            }}
            multiline
            minRows={5}
            maxRows={Infinity}
            required
            fullWidth
          />
        </ListItem>
        <Divider />
        {/* Subscribers field */}
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
            {/* {data.subscribers.map((subsciber, index) => (
            <Chip
              key={index}
              icon={<AccountCircleIcon />}
              label={truncateString(subsciber.username, 15)}
              variant="outlined"
              onClick={() => console.log("chip")}
              size="small"
            />
          ))} */}
            ADD SUBSCRIBERS
          </Box>
        </ListItem>
        <Divider />
        {/* Tags field */}
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
        {/* Subtasks field */}
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
        {/* Timeframe field */}
        <ListItem>
          <Box width="40%">
            <ListItemIcon sx={{ pt: 1 }}>
              <CalendarIcon />
              <Typography pl={1} variant="subtitle2" component="p">
                Timeframe
              </Typography>
            </ListItemIcon>
          </Box>
          <Box
            width="60%"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <DatePicker
              flex={1}
              label="Start"
              value={data.date_start}
              onChange={(value) => {
                setData(data, () => {
                  return { ...data, date_start: value };
                });
              }}
            />
            <DatePicker
              flex={1}
              label="End"
              value={data.date_end}
              onChange={(value) => {
                setData(data, () => {
                  return { ...data, date_end: value };
                });
              }}
            />
          </Box>
        </ListItem>
        {/* Publish / Discard buttons */}
        <ListItem>
          <Box
            width="100%"
            sx={{
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Button
              component={Link}
              // to={`/dashboard/task/${data.task.task_id}/edit`}
              color="secondary"
              variant="outlined"
              size="large"
            >
              Discard
            </Button>
            <Button
              component="button"
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
            >
              Publish
            </Button>
          </Box>
        </ListItem>
      </List>
    </LocalizationProvider>
  );
}

export default Task;
