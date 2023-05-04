import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo, createUser } from "../services/user.api";

import { NavLink } from "react-router-dom";

function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();

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
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        This is the dashboard. It displays all of a user's tasks and projects.
      </p>
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
      </div>
    </div>
  );
}

export default Dashboard;
