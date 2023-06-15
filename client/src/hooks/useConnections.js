import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addConnection as doAdd,
  acceptConnection as doAccept,
  getConnections,
  removeConnection as doRemove,
} from "../services/user.api";

/**
 * This hook provides methods and state variables for reading and managing user
 * connections.
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
      if (response.status === 200) setConnections(response.data);
      else throw Error();
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doAdd(token, user_id);
      console.log("response", response);
    } catch (e) {}
  };

  const acceptConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doAccept(token, user_id);
      console.log("response", response);
    } catch (e) {}
  };

  const removeConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doRemove(token, user_id);
      console.log("response", response);
    } catch (e) {}
  };

  const reloadConnections = () => {
    fetchConnections();
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return {
    connections,
    isLoading,
    error,
    reloadConnections,
    addConnection,
    acceptConnection,
    removeConnection,
  };
}
