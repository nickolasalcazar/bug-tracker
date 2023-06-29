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
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import useUserProfile from "../hooks/useUserProfile";
import useGetTaskByParam from "../hooks/useGetTaskByParam";
import { useAuth0 } from "@auth0/auth0-react";
import { createTask, updateTask, getPrivileges } from "../services/task.api";
import { TasksContext } from "../context/TasksContext";

import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import TaskWrapper from "./TaskWrapper";

import TaskHeader from "./TaskHeader";
import {
  DescriptionField,
  LeftColumn,
  ParentTaskField,
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
  const [parentFieldError, setParentFieldError] = useState(false);

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

  // After hook useGetTaskByParam loads (or fails to load) the task,
  // either save the task data to or add the logged in user as the default value
  useEffect(() => {
    if (isLoading) return;
    else if (error) {
      if (userProfile) {
        const taskIsNew = data.task_id === null;
        setData({
          ...data,
          subscribers: taskIsNew ? [userProfile.username] : data.subscribers,
        });
      }
      return;
    }
    setData(task);
  }, [task, userProfile]);

  const fetchPrivileges = async (token, task_id) =>
    (await getPrivileges(token, task_id)).data;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskIsNew = data.task_id === null;
    const accessToken = await getAccessTokenSilently();
    const now = new Date().toISOString();
    data[taskIsNew ? "date_created" : "date_modified"] = now;

    const parent_id = data.parent_task_id;

    // Check if parent_task_id is appropriate
    if (parent_id === "" || parent_id === null) {
      setParentFieldError(false);
    } else if (isNaN(parent_id)) {
      setParentFieldError(true);
      return;
    } else if (parseInt(parent_id) < 0) {
      setParentFieldError(true);
      return;
    }

    // Check if user has permission to assign parent task
    console.log("parent_id", parent_id);
    if (parent_id !== "" && parent_id !== null) {
      const privileges = await fetchPrivileges(accessToken, parent_id);
      console.log("privileges", privileges);
      if (!privileges.owner && !privileges.subscriber) {
        setParentFieldError(true);
        return;
      }
    }

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
              <SubscribersField
                data={data}
                setData={setData}
                user={userProfile}
              />
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
            <LeftColumn icon={SubtasksIcon} label="Parent Task ID" />
            <RightColumn>
              <ParentTaskField
                data={data}
                setData={setData}
                error={parentFieldError}
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
