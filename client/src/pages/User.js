import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

/**
 * Component that displays info about a user, and provides inputs for managing
 * user relationships.
 */
export default function User() {
  const { username } = useParams();
  const { user, isLoading, error } = useGetUser(username);

  useEffect(() => {
    // console.log("username", username);
    console.log("user", user);
  }, [user]);

  return (
    <div>
      <h1>User</h1>
    </div>
  );
}
