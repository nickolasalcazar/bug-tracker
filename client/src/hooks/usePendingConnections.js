import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getPendingConnections } from "../services/user.api";

/**
 * A hook that fetches the pending connections of the logged-in user.
 */
export default function usePendingConnections() {
  const { getAccessTokenSilently } = useAuth0();
  const [pendingConnections, setPendingConnections] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchConnections = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getPendingConnections(token);
      setPendingConnections(response.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadPendingConnections = () => {
    fetchConnections();
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return { pendingConnections, isLoading, error, reloadPendingConnections };
}
