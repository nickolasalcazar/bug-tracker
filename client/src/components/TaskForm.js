import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiChipsInput } from "mui-chips-input";

import useUserProfile from "../hooks/useUserProfile";
import useGetTaskByParam from "../hooks/useGetTaskByParam";
import { useAuth0 } from "@auth0/auth0-react";
import { createTask } from "../services/task.api";

import TaskIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import StarOutlineIcon from "@mui/icons-material/StarOutlineRounded";
import OpenInNewIcon from "@mui/icons-material/OpenInNewRounded";
import FullscreenIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreenRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";

/**
 * Component that displays all of the details of a task.
 */
export default function TaskForm({
  setRenderTable = undefined,
  renderTable = undefined,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const { userProfile } = useUserProfile();
  const { task, isLoading, error } = useGetTaskByParam();

  const [data, setData] = useState({
    task_id: null,
    title: null,
    status: null,
    priority: null,
    description: null,
    subscribers: [],
    tags: [],
    project_id: null,
    subtasks: [],
    date_created: null,
    date_start: null,
    date_end: null,
  });

  // When task loads, save to data
  useEffect(() => {
    if (isLoading) return;
    else if (error) {
      // Add logged in user as default subscriber
      if (userProfile) {
        setData((data) => {
          return { ...data, subscribers: [userProfile.username] };
        });
      }
      return;
    }
    // console.log("task", task);
    setData(task);
  }, [task, userProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    // Before submting do validation checks
    // Check if dates can be converted to ISO properly
    console.log("Submitting", data);

    const response = await createTask(accessToken, data);
    console.log(response);
  };

  // Converts an ISO date string to a dayjs object
  // Because DatePicker component requires dayjs format
  const convertIsoToDayjs = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    // eslint-disable-next-line no-undef
    return dayjs({
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
    });
  };

  if (data === null)
    return <Typography component="h2">Loading task...</Typography>;

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
                {data.task_id ?? "New Task"}
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
            value={data.title ?? ""}
            variant="standard"
            placeholder="Task title"
            size="medium"
            fullWidth
            required
            onChange={(e) => {
              setData((data) => {
                return { ...data, title: e.target.value };
              });
            }}
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
              required
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
              required
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
            value={data.description ?? ""}
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
            fullWidth
          />
        </ListItem>
        <Divider />
        {/* Subscribers field */}
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box flex={1} minWidth={160}>
            <ListItemIcon sx={{ pt: 1 }}>
              <SubscriberIcon />
              <Typography pl={1} variant="subtitle2" component="p">
                Subscribers
              </Typography>
            </ListItemIcon>
          </Box>
          <Box flex={2} sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <MuiChipsInput
              placeholder="Add subscriber"
              helperText="Enter username or email"
              fullWidth
              value={data.subscribers.map((subscriber) => subscriber)}
              onChange={(newChips) => {
                setData((data) => ({
                  ...data,
                  subscribers: newChips.map((c) => c.toLowerCase()),
                }));
              }}
              validate={(chipValue) => {
                if (data.tags.includes(chipValue.toLowerCase())) return false;

                // Do validation check to see if user exists; throw errors

                return {
                  isError: chipValue.length > 254 || chipValue.length < 3,
                  textError: "Value must be at least 3 characters long",
                };
              }}
            />
          </Box>
        </ListItem>
        <Divider />
        {/* Tags field */}
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box flex={1} minWidth={160}>
            <ListItemIcon sx={{ pt: 1 }}>
              <TagIcon />
              <Typography pl={1} variant="subtitle2" component="p">
                Tags
              </Typography>
            </ListItemIcon>
          </Box>
          <Box flex={2} sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <MuiChipsInput
              placeholder="Add tag"
              fullWidth
              value={data.tags}
              onChange={(newChips) => {
                setData((data) => ({
                  ...data,
                  tags: newChips.map((c) => c.toLowerCase()),
                }));
              }}
              validate={(chipValue) => {
                if (data.tags.includes(chipValue.toLowerCase())) return false;
                return {
                  isError: chipValue.length > 16 || chipValue.length < 3,
                  textError: "Tag must be between 3 and 16 characters long",
                };
              }}
            />
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
        {/* Schedule field */}
        {/* DatePicker dates use dayjs; results in crash when switching between mobile/desktop (only?) in development */}
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box flex={1} minWidth={160}>
            <ListItemIcon sx={{ pt: 1 }}>
              <CalendarIcon />
              <Typography pl={1} variant="subtitle2" component="p">
                Schedule
              </Typography>
            </ListItemIcon>
          </Box>
          <Box
            flex={2}
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, minWidth: 200 }}
          >
            {/* Breaks because dates are not formatted to dayjs */}
            <DatePicker
              flex={1}
              label="Start date"
              value={convertIsoToDayjs(data.date_start) ?? null}
              onChange={(date) => {
                if (!date) return;
                setData((data) => {
                  return { ...data, date_start: date.$d };
                });
              }}
            />
            <DatePicker
              flex={1}
              label="End date"
              value={convertIsoToDayjs(data.date_end) ?? null}
              onChange={(date) => {
                if (!date) return;
                setData((data) => {
                  return { ...data, date_end: date.$d };
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
