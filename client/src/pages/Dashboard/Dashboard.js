import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../../services/user.api";
import { getAllSubscribedTasks } from "../../services/task.api";

import DataTable from "../../components/DataTable/DataTable";
import { Box, Stack } from "@mui/material";
import RightCanvas from "./RightCanvas";
import NewTask from "../../components/NewTask";

/**
 * Renders the main dashboard that the user sees when they enter the app.
 */
function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [rightBarVisible, setRightBarVisible] = useState(false);

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

      const columns = Object.keys(res.data[0]);
      const rows = res.data.map((row) => Object.values(row));
      // const rows = res.data; // For custom table

      // console.log("res.data", res.data);
      // console.log("columns", columns);
      // console.log("rows", rows);

      setColumns(columns);
      setRows(rows);
    };
    getSubscribedTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnRowClick = () => {
    setRightBarVisible(!rightBarVisible);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ p: "none", m: "none" }}
      justifyContent="space-around"
    >
      <Box
        sx={{
          width: rightBarVisible
            ? { sm: "100%", md: "60%", lg: "75%" }
            : "100%",
          maxWidth: "95vw",
        }}
      >
        <DataTable
          columns={columns}
          rows={rows}
          handleOnRowClick={handleOnRowClick}
        />
      </Box>
      {rightBarVisible ? (
        <Box
          sx={{
            width: "50%",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <RightCanvas>
            <NewTask />
          </RightCanvas>
        </Box>
      ) : null}
    </Stack>
  );
}

export default Dashboard;