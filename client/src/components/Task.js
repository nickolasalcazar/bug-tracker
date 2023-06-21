import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import LinkIcon from "@mui/icons-material/InsertLinkOutlined";

import TaskWrapper from "./TaskWrapper";
import TaskHeader from "./TaskHeader";
import useGetTaskByParam from "../hooks/useGetTaskByParam";
import { deleteTask } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";
import { TasksContext } from "../context/TasksContext";

/**
 * Component that displays all of the details of a task.
 */
export default function Task({ setExpanded = null, expanded = null }) {
  const navigate = useNavigate();
  const { updateTasksContext } = useContext(TasksContext);
  const { getAccessTokenSilently } = useAuth0();
  const { task, isLoading, error } = useGetTaskByParam();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(task);
    console.log("task", task);
  }, [task, isLoading, error]);

  const formatIsoString = (str) =>
    new Date(str).toLocaleDateString({
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await deleteTask(token, data.task_id);
      if (response.status === 202) {
        updateTasksContext(); // Reload tasks
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (data === null)
    return <Typography component="h2">Loading task...</Typography>;

  return (
    <>
      <TaskWrapper>
        <List>
          <ListItem>
            <TaskHeader
              data={data}
              expanded={expanded}
              setExpanded={setExpanded}
              handleClose={() => {
                navigate("..");
              }}
              handleDelete={handleClickOpen}
            />
          </ListItem>
          <ListItem sx={{ pb: 0 }}>
            <Typography variant="h6" component="h2" fontWeight="medium">
              {data.title}
            </Typography>
          </ListItem>
          <ListItem>
            <Stack direction="row" spacing={1}>
              <Chip size="small" label={`Status: ${data.status}`} />
              <Chip size="small" label={`Priority: ${data.priority}`} />
            </Stack>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="p" sx={{ pt: 2, pb: 4 }}>
              {data.description ?? (
                <Typography fontStyle="italic" children="No description" />
              )}
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
                    {data.creator} ({data.date_created})
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
            <Box
              width="60%"
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            >
              {data.subscribers.map((subscriber, index) => (
                <Chip
                  key={index}
                  icon={<AccountCircleIcon />}
                  label={subscriber}
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
            <Box
              width="60%"
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            >
              {data.tags === null || data.tags.length === 0 ? (
                <Typography fontSize="14px" component="p" fontStyle="italic">
                  No tags assigned
                </Typography>
              ) : (
                data.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    onClick={() => console.log("chip")}
                    size="small"
                  />
                ))
              )}
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <Box width="40%">
              <ListItemIcon sx={{ pt: 1 }}>
                <SubtasksIcon />
                <Typography pl={1} variant="subtitle2" component="p">
                  Parent Task
                </Typography>
              </ListItemIcon>
            </Box>
            <Box width="60%">
              <ListItemText
                primary={
                  data.parent_task_id ? (
                    <Link to={`/dashboard/task/${data.parent_task_id}`}>
                      <Chip
                        clickable
                        label={data.parent_title}
                        icon={<LinkIcon fontSize="small" />}
                        variant="outlined"
                        color="secondary"
                      />
                    </Link>
                  ) : (
                    <Typography
                      fontSize="14px"
                      component="p"
                      fontStyle="italic"
                    >
                      No parent task
                    </Typography>
                  )
                }
              />
            </Box>
          </ListItem>

          {!data.date_start || !data.date_end ? null : (
            <>
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
                        {`${formatIsoString(
                          data.date_start
                        )} - ${formatIsoString(data.date_end)}`}
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
            </>
          )}
        </List>
      </TaskWrapper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to permanently delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleDeleteTask();
            }}
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
