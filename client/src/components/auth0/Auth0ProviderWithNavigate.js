import { Auth0Provider } from "@auth0/auth0-react";
import config from "../../config";
import { useNavigate } from "react-router-dom";

/**
 * Wrapping any component tree with Auth0ProviderWithNavigate will give it
 * access to the Auth0Context.
 */
export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain = config.auth0.DOMAIN;
  const clientId = config.auth0.CLIENT_ID;
  const redirectUri = config.auth0.CALLBACK_URL;
  const audience = config.auth0.AUDIENCE;

  // Called after users are redirected from Auth0's universal login.
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
