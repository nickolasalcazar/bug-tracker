import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <a className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </a>
  );
}
