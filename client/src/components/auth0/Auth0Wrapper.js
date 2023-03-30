import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Waits for the Auth0 SDK to initialize and handle any errors with the
 * isLoading and error states.
 */
export default function Auth0Wrapper({ children }) {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return <>{children}</>;
}
