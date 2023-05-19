import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../services/user.api";
import { getAllSubscribedTasks } from "../services/task.api";

import { NavLink } from "react-router-dom";
import DataTable from "../components/DataTable";
import { Box, Container, Stack } from "@mui/material";

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
      // const rows = res.data;

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

  return (
    <Stack direction="row">
      {/* SideBar */}
      <Container
        flex={1}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <div>
          <h2>Projects</h2>
          <ul>
            <li>
              <button>
                <NavLink to="/projects">View Projects</NavLink>
              </button>
            </li>
            <li>
              <button>
                <NavLink to="/projects/new">Create New Project</NavLink>
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h2>Tasks</h2>
          <button>
            <NavLink to="/tasks/new">New Task</NavLink>
          </button>
        </div>
      </Container>
      {/* DataTable */}
      <Container flex={2}>
        <DataTable columns={columns} rows={rows} />
      </Container>
      {/* RightBar */}
      <Container
        flex={1}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        Rightbar
      </Container>
    </Stack>
  );
}

export default Dashboard;
