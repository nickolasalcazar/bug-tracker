import React, { useEffect } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import { getUserInfo } from "../services/user.api";

function Dashboard(props) {
  const { user, getAccessTokenSilently } = useAuth0();
  // const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    // After the user signs in they are redirected to this page
    // This function checks if they are new user
    // If they are new user, create their profile in backend
    const isUserNew = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserInfo(accessToken, user.sub);

      if (!isMounted) {
        return;
      }

      if (data) {
        console.log("Data", data);
        // setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        console.log("Error", error);
        // setMessage(JSON.stringify(error, null, 2));
      }
    };

    isUserNew();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
