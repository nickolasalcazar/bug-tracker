import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Use loginWithRedirect or loginWithPopup to log your users in.
 */
export default function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    !isAuthenticated && <button onClick={loginWithRedirect}>Log in</button>
  );
}
