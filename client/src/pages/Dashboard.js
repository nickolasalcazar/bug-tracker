import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../services/user.api";
import { getAllSubscribedTasks } from "../services/task.api";

import DataTable from "../components/DataTable/DataTable";
import { Box, Paper, Stack } from "@mui/material";
import NewTask from "../components/NewTask";
import Task from "../components/Task";

/**
 * Renders the main dashboard that the user sees when they enter the app.
 */
function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [renderTable, setRenderTable] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Whenever the user signs in they are redirected to this page.
    // This function checks if they are a new user.
    // If they are new user, their profile is created in the backend.
    const newUserCheck = async () => {
      const accessToken = await getAccessTokenSilently();
      let res = await getUserInfo(accessToken, user.sub);
      if (res.status === 404) await createUser(accessToken, user);
      if (!isMounted) return;
    };
    newUserCheck();

    const getSubscribedTasks = async () => {
      const accessToken = await getAccessTokenSilently();
      const res = await getAllSubscribedTasks(accessToken);
      // console.log("res.data", res.data);
      const columns = Object.keys(res.data[0]);
      const rows = res.data.map((row) => Object.values(row));

      setColumns(columns);
      setRows(rows);
    };
    getSubscribedTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnRowClick = () => {
    console.log("Dashboard: row clicked");
  };

  return (
    <Stack
      direction={{ sx: "column", sm: "column", md: "column", lg: "row" }}
      spacing={1}
      sx={{
        m: "none",
        pt: { xs: 1, sm: 0 },
      }}
      justifyContent="space-around"
    >
      {/* {renderTable ? (
        <Box sx={{ width: "100%" }}>
          <DataTable
            columns={columns}
            rows={rows}
            handleOnRowClick={handleOnRowClick}
          />
        </Box>
      ) : null} */}
      <Routes>
        <Route
          element={
            <Box
              sx={{
                pt: { xs: 1, sm: 0 },
                pb: { xs: 15, sm: 15, md: 0 },
                width: renderTable
                  ? { md: "100%", lg: "50%", xl: "40%" }
                  : "100%",
                display: "block",
              }}
            >
              <Paper sx={{ py: 0.5, px: 0 }}>
                <Outlet />
              </Paper>
            </Box>
          }
        >
          <Route path="task/new" element={<NewTask />} />
          <Route path="task/:id/edit" element={"Edit a task"} />
          <Route
            path="task/:id"
            element={
              <Task setRenderTable={setRenderTable} renderTable={renderTable} />
            }
          />
        </Route>
      </Routes>
      {renderTable ? (
        <Box sx={{ width: "100%" }}>
          <DataTable
            columns={columns}
            rows={rows}
            handleOnRowClick={handleOnRowClick}
          />
        </Box>
      ) : null}
    </Stack>
  );
}

export default Dashboard;
