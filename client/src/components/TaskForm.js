import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import useUserProfile from "../hooks/useUserProfile";
import useGetTaskByParam from "../hooks/useGetTaskByParam";
import { useAuth0 } from "@auth0/auth0-react";
import { createTask, updateTask } from "../services/task.api";
import { TasksContext } from "../context/TasksContext";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import TaskWrapper from "./TaskWrapper";

import TaskHeader from "./TaskHeader";
import {
  DescriptionField,
  LeftColumn,
  PriorityField,
  RightColumn,
  ScheduleField,
  StatusField,
  SubscribersField,
  TagsField,
  TitleField,
} from "./TaskFormComponents";

const rowStyling = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 1,
};

/**
 * Component that displays all of the details of a task.
 */
export default function TaskForm({ setExpanded = null, expanded = null }) {
  const navigate = useNavigate();
  const { updateTasksContext } = useContext(TasksContext);
  const { getAccessTokenSilently } = useAuth0();
  const { userProfile } = useUserProfile();
  const { task, isLoading, error } = useGetTaskByParam();
  const [open, setOpen] = useState(false); // Close form button dialog

  const [data, setData] = useState({
    task_id: null,
    title: null,
    status: null,
    priority: null,
    description: null,
    subscribers: [],
    tags: [],
    parent_task_id: null,
    subtasks: [],
    date_created: null,
    date_modified: null,
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
    setData(task);
  }, [task, userProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskIsNew = data.task_id === null;
    const accessToken = await getAccessTokenSilently();
    const now = new Date().toISOString();
    data[taskIsNew ? "date_created" : "date_modified"] = now;

    // Perform validation checks here
    // Check if dates can be converted to ISO properly
    console.log("Submitting", data);

    try {
      const response = taskIsNew
        ? await createTask(accessToken, data)
        : await updateTask(accessToken, data);
      console.log(response);
      if (response.status === 201) {
        updateTasksContext();
        navigate(`/dashboard/task/${response.data.task_id}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  if (data === null || data === undefined)
    return <Typography component="h2">Loading task...</Typography>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskWrapper>
        <List component={"form"} onSubmit={handleSubmit}>
          <ListItem>
            <TaskHeader
              data={data}
              expanded={expanded}
              setExpanded={setExpanded}
              handleClose={handleOpenDialog}
            />
          </ListItem>
          <ListItem>
            <TitleField data={data} setData={setData} />
          </ListItem>
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
              <StatusField data={data} setData={setData} />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <PriorityField data={data} setData={setData} />
            </FormControl>
          </ListItem>
          <Divider />
          <ListItem>
            <DescriptionField data={data} setData={setData} />
          </ListItem>
          <Divider />
          <ListItem sx={rowStyling}>
            <LeftColumn icon={SubscriberIcon} label="Subscribers" />
            <RightColumn>
              <SubscribersField data={data} setData={setData} />
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem sx={rowStyling}>
            <LeftColumn icon={TagIcon} label="Tags" />
            <RightColumn>
              <TagsField data={data} setData={setData} />
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem sx={rowStyling}>
            <LeftColumn icon={SubtasksIcon} label="Parent Task" />
            <RightColumn>
              <TextField
                type="text"
                value={data.parent_task_id ?? ""}
                placeholder="Parent task ID"
                onChange={(e) => {
                  setData((data) => {
                    return {
                      ...data,
                      parent_task_id: e.target.value,
                    };
                  });
                }}
              />
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem sx={rowStyling}>
            <LeftColumn icon={CalendarIcon} label="Schedule" />
            <RightColumn>
              <ScheduleField data={data} setData={setData} />
            </RightColumn>
          </ListItem>
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
                onClick={handleOpenDialog}
                color="secondary"
                variant="outlined"
                size="large"
              >
                Cancel
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
      </TaskWrapper>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Unsaved changes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to exit? Any unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog();
              navigate(-1);
            }}
            variant="contained"
            autoFocus
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
