import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../services/user.api";
import { getAllSubscribedTasks } from "../services/task.api";

import DataTable from "../components/DataTable/DataTable";
import { Box, Container, CssBaseline, Stack, Typography } from "@mui/material";
import RightBar from "../components/RightBar";
import NewTask from "../components/NewTask";

function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

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

  // return (
  //   <Box
  //     sx={{
  //       flex: 1,
  //       backgroundColor: "#ffffff",
  //     }}
  //   >
  //     <Typography>Hello</Typography>
  //   </Box>
  // );

  return (
    <Stack direction="row" sx={{ p: "none", m: "none" }}>
      <CssBaseline />
      <Container>
        <DataTable columns={columns} rows={rows} />
      </Container>
      <Container sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <RightBar>
          {/* NewTask added as child for testing */}
          <NewTask />
        </RightBar>
      </Container>
    </Stack>
  );
}

export default Dashboard;
