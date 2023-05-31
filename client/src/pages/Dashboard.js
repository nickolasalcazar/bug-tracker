import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../services/user.api";
import { getAllSubscribedTasks } from "../services/task.api";

import DataTable from "../components/DataTable/DataTable";
import { Box, Paper, Stack } from "@mui/material";
import NewTask from "../components/NewTask";
import Task from "../components/Task";

const TABLE_OFFSET_LIMIT = 250;
const CANVAS_OFFSET_LIMIT = -210;
const DRAG_COEFFICIENT = 2;

/**
 * Renders the main dashboard that the user sees when they enter the app.
 */
function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [renderTable, setRenderTable] = useState(true);
  const [renderDragBar, setRenderDragBar] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

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

  const dragBar = document.getElementById("drag-bar");
  const onMouseUp = (e) => {
    const x1 = parseInt(dragBar.dataset.xStart);
    const x2 = e.clientX;
    let y = x2 - x1 + dragOffset;
    if (y < CANVAS_OFFSET_LIMIT) y = CANVAS_OFFSET_LIMIT;
    else if (y > TABLE_OFFSET_LIMIT) y = TABLE_OFFSET_LIMIT;
    console.log(y);
    setDragOffset(y);
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
      <Routes>
        <Route
          element={
            <Box
              sx={{
                pb: { xs: 1, sm: 0, md: 0 },
                width: {
                  md: "100%",
                  lg: renderTable
                    ? `calc(100% + ${dragOffset}px * ${DRAG_COEFFICIENT})`
                    : "100%",
                  xl: renderTable
                    ? `calc(100% + ${dragOffset}px * ${DRAG_COEFFICIENT})`
                    : "100%",
                },
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
      <Box
        component="div"
        id="drag-bar"
        data-x-start="null"
        onMouseDown={(e) => {
          dragBar.dataset.xStart = e.clientX;
          document.addEventListener("mouseup", onMouseUp, {
            once: true,
          });
        }}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: renderTable ? "block" : "none",
            xl: renderTable ? "block" : "none",
          },
        }}
      >
        ...
      </Box>
      {renderTable ? (
        <Box
          sx={{
            width: `calc(100% - ${dragOffset}px * ${DRAG_COEFFICIENT})`,
          }}
        >
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
