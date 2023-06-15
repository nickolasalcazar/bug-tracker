import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getConnections } from "../services/user.api";

/**
 * This hook fetches all the connections of the logged in user.
 */
export default function useConnections() {
  const { getAccessTokenSilently } = useAuth0();
  const [connections, setConnections] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchConnections = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getConnections(token);
      console.log("useConnections response", response);
      if (response.status === 200) setConnections(response.data);
      else throw Error();
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadConnections = () => {
    fetchConnections();
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return { connections, isLoading, error, reloadConnections };
}
