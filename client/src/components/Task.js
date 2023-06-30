import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubtasksIcon from "@mui/icons-material/ListOutlined";
import SubscriberIcon from "@mui/icons-material/Inbox";
import TagIcon from "@mui/icons-material/LocalOfferOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";

import PageLoader from "./PageLoader";
import TaskWrapper from "./TaskWrapper";
import TaskHeader from "./TaskHeader";
import TaskChip from "./TaskChip";
import useGetTaskByParam from "../hooks/useGetTaskByParam";
import { deleteTask } from "../services/task.api";
import { useAuth0 } from "@auth0/auth0-react";
import { TasksContext } from "../context/TasksContext";
import { LeftColumn, RightColumn } from "./TaskFormComponents";

/**
 * Component that displays all of the details of a task.
 */
export default function Task({ setExpanded = null, expanded = null }) {
  const navigate = useNavigate();
  const { updateTasksContext } = useContext(TasksContext);
  const { getAccessTokenSilently } = useAuth0();
  const { task, isLoading, error } = useGetTaskByParam();
  const [open, setOpen] = useState(false);

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
      const response = await deleteTask(token, task.task_id);
      if (response.status === 202) {
        updateTasksContext(); // Reload tasks
        navigate("/dashboard");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  if (isLoading === true) return <PageLoader />;
  else if (error)
    return (
      <Paper>
        <Container>An error ocurred loading this task</Container>
      </Paper>
    );

  return (
    <>
      <TaskWrapper>
        <List>
          <ListItem>
            <TaskHeader
              data={task}
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
              {task.title}
            </Typography>
          </ListItem>
          <ListItem>
            <Stack direction="row" spacing={1}>
              <Chip size="small" label={`Status: ${task.status}`} />
              <Chip size="small" label={`Priority: ${task.priority}`} />
            </Stack>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="p" sx={{ pt: 2, pb: 4 }}>
              {task.description ?? (
                <Typography fontStyle="italic" children="No description" />
              )}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <LeftColumn icon={PersonIcon} label="Creator" />
            <RightColumn>
              <ListItemText
                primary={
                  <Typography fontSize="14px" component="p">
                    {task.creator} ({task.date_created})
                  </Typography>
                }
              />
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem>
            <LeftColumn icon={SubscriberIcon} label="Subscribers" />
            <RightColumn>
              {task.subscribers.map((subscriber, index) => (
                <Chip
                  key={index}
                  icon={<AccountCircleIcon />}
                  label={subscriber}
                  variant="outlined"
                  onClick={() => console.log("chip")}
                  size="small"
                />
              ))}
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem>
            <LeftColumn icon={TagIcon} label="Tags" />
            <RightColumn>
              {task.tags === null || task.tags.length === 0 ? (
                <Typography fontSize="14px" component="p" fontStyle="italic">
                  No tags assigned
                </Typography>
              ) : (
                task.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    // onClick={() => console.log("chip")}
                    size="small"
                  />
                ))
              )}
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem>
            <LeftColumn icon={SubtasksIcon} label="Parent Task" />
            <RightColumn>
              <ListItemText
                primary={
                  task.parent_task_id ? (
                    <TaskChip
                      id={task.parent_task_id}
                      title={task.parent_title}
                      component="div"
                    />
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
            </RightColumn>
          </ListItem>
          <Divider />
          <ListItem>
            <LeftColumn icon={SubtasksIcon} label="Child Tasks" />
            <RightColumn>
              <List dense={true}>
                {task.child_tasks ? (
                  task.child_tasks.map((task) => (
                    <TaskChip
                      key={task.task_id}
                      id={task.task_id}
                      title={task.title}
                      status={task.status}
                    />
                  ))
                ) : (
                  <Typography fontSize="14px" component="p" fontStyle="italic">
                    No child tasks
                  </Typography>
                )}
              </List>
            </RightColumn>
          </ListItem>
          {!task.date_start || !task.date_end ? null : (
            <>
              <Divider />
              <ListItem>
                <LeftColumn icon={CalendarIcon} label="Timeframe" />
                <RightColumn>
                  <ListItemText
                    primary={
                      <Typography fontSize="14px" component="p">
                        {`${formatIsoString(
                          task.date_start
                        )} - ${formatIsoString(task.date_end)}`}
                      </Typography>
                    }
                  />
                </RightColumn>
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
