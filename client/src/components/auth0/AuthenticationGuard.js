import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import PageLoader from "../PageLoader";

/**
 * Requires users to log in before they can access a React route.
 *
 * @example
 *
 * <Routes>
 *   <Route
 *     path="/profile"
 *     element={<AuthenticationGuard component={Profile} />}
 *   />
 * </Routes>
 */
export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
