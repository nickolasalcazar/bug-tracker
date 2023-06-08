import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
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
import useGetTaskByParam from "../hooks/useGetTaskByParam";

/**
 * Component that displays all of the details of a task.
 */
function Task({ setRenderTable = undefined, renderTable = undefined }) {
  const [data, setData] = useState(null);
  const { task, isLoading, error } = useGetTaskByParam();

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

  if (data === null)
    return <Typography component="h2">Loading task...</Typography>;

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
              {data.task_id}
            </Typography>
          </Box>
          <Button
            component={Link}
            to={`/dashboard/task/form/${data.task_id}`}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Discard
          </Button>
          <Button
            component={Link}
            to={`/dashboard/task/form/${data.task_id}`}
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
          {data.description}
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
        <Box width="60%" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
        <Box width="60%" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {data.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
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
              Parent Task
            </Typography>
          </ListItemIcon>
        </Box>
        <Box width="60%">
          <ListItemText
            primary={
              <Typography fontSize="14px" component="p">
                Parent Task Title goes here
              </Typography>
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
                    {`${formatIsoString(data.date_start)} - ${formatIsoString(
                      data.date_end
                    )}`}
                  </Typography>
                }
              />
            </Box>
          </ListItem>
        </>
      )}
    </List>
  );
}

export default Task;
