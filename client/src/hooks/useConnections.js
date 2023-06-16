import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addConnection as doAdd,
  acceptConnection as doAccept,
  getConnections,
  getConnectionsByUsername,
  removeConnection as doRemove,
} from "../services/user.api";

/**
 * The useConnections hook facilitates reading and managing user connections.
 * It fetches connections based on the provided username. If no username is
 * provided, it fetches connections belonging to the logged-in user.
 *
 * @param {string} username Optional.
 */
export default function useConnections(username) {
  const { getAccessTokenSilently } = useAuth0();
  const [connections, setConnections] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch connections belonging to the logged in user.
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

  // Fetch connections belonging to a username.
  const fetchConnectionsByUsername = async () => {
    try {
      if (username === null || username === undefined) throw Error();
      const token = await getAccessTokenSilently();
      const response = await getConnectionsByUsername(token, username);
      if (response.status === 200) setConnections(response.data);
      else throw Error();
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Creates a connection request between two users.
   * Returns true if successful, false otherwise.
   */
  const addConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doAdd(token, user_id);
      console.log("response", response);
      return response.status === 201;
    } catch (e) {
      return false;
    }
  };

  /**
   * Accepts a connection request between two users.
   * Returns true if successful, false otherwise.
   */
  const acceptConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doAccept(token, user_id);
      console.log("response", response);
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };

  /**
   * Removes a connection request between two users.
   * Returns true if successful, false otherwise.
   */
  const removeConnection = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await doRemove(token, user_id);
      console.log("response", response);
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };

  const reloadConnections = () => {
    if (username === null) return null;
    else if (username === undefined) fetchConnections();
    else fetchConnectionsByUsername();
  };

  useEffect(() => {
    reloadConnections();
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
