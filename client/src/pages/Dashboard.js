import { useContext, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import { Box, Chip, Stack } from "@mui/material";
import DataTable from "../components/DataTable";
import TaskForm from "../components/TaskForm";
import Task from "../components/Task";

/**
 * Renders the main dashboard that the user sees when they enter the app.
 */
export default function Dashboard() {
  const { tasksContext } = useContext(TasksContext);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [expanded, setExpanded] = useState(true);

  // Fetch tasks, transform them into rows & columns
  useEffect(() => {
    if (tasksContext.error || tasksContext.isLoading) return;
    else if (tasksContext.tasks.length === 0) return;
    const rows = tasksContext.tasks.map((row) => Object.values(row));
    const columns = Object.keys(tasksContext.tasks[0]);
    setColumns(columns);
    rows.forEach((row) => {
      const tags = row[4];
      row[4] = [];
      tags.forEach((tag) => {
        row[4].push(<Chip label={tag} variant="outlined" size="small" />);
      });
    });
    setRows(rows);
  }, [tasksContext]);

  const handleOnRowClick = () => {
    console.log("Dashboard: row clicked");
  };

  return (
    <Stack
      direction={{
        sx: "column",
        sm: "column",
        md: "column",
        lg: expanded ? "column" : "row",
        xl: expanded ? "column" : "row",
      }}
      spacing={1}
      sx={{
        m: "none",
      }}
      justifyContent="space-around"
    >
      <Routes>
        <Route
          element={
            <Box
              sx={{
                width: "100%",
                display: "block",
                pb: { xs: 1, sm: 0 },
              }}
            >
              <Outlet />
            </Box>
          }
        >
          <Route
            path="task/form"
            element={<TaskForm setExpanded={setExpanded} expanded={expanded} />}
          />
          <Route
            path="task/form/:id"
            element={<TaskForm setExpanded={setExpanded} expanded={expanded} />}
          />
          <Route
            path="task/:id"
            element={<Task setExpanded={setExpanded} expanded={expanded} />}
          />
        </Route>
      </Routes>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <DataTable
          columns={columns}
          rows={rows}
          handleOnRowClick={handleOnRowClick}
        />
      </Box>
    </Stack>
  );
}
