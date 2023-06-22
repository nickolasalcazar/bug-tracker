/**
 * Exports various components for Task and TaskForm.
 */
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiChipsInput } from "mui-chips-input";
import useConnections from "../hooks/useConnections";

export const LeftColumn = ({ icon: FieldIcon, label }) => (
  <Box flex={1} minWidth={160} mt={1}>
    <ListItemIcon>
      <FieldIcon />
      <Typography pl={1} variant="subtitle2" component="p">
        {label}
      </Typography>
    </ListItemIcon>
  </Box>
);

export const RightColumn = ({ children }) => (
  <Box flex={2} sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
    {children}
  </Box>
);

export const ScheduleField = ({ data, setData }) => {
  // Converts an ISO date string to a dayjs object
  // DatePicker component requires dayjs format
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

  return (
    <>
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
    </>
  );
};

export const DescriptionField = ({ data, setData }) => (
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
);

export const PriorityField = ({ data, setData }) => (
  <>
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
  </>
);

export const StatusField = ({ data, setData }) => (
  <>
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
  </>
);

export const TagsField = ({ data, setData }) => (
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
);

export const SubscribersField = ({ data, setData, user = null }) => {
  const { connections, isLoading, error } = useConnections();

  useEffect(() => {
    if (user === null) return;
    setData({
      ...data,
      subscribers: [user.username],
    });
  }, [connections, user]);

  const loading = connections === null || user === null;

  return loading ? null : (
    <Autocomplete
      fullWidth
      multiple
      loading={isLoading}
      options={[user.username, ...connections.map((u) => u.username)]}
      value={data.subscribers}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value}
      onChange={(event, value) => {
        console.log("subscribers field value", value);
        setData({ ...data, subscribers: value });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Add subscriber"
          placeholder="Username"
        />
      )}
    />
  );
};

export const TitleField = ({ data, setData }) => (
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
);
