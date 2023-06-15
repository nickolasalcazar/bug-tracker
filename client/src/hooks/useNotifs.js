import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getNotifs } from "../services/notifs.api";

/**
 * This hook returns the state of various notifications.
 */
export default function useNotifs(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [notifs, setNotifs] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifs = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getNotifs(token);
      setNotifs(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };

  const reloadNotifs = () => {
    fetchNotifs();
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  return { notifs, isLoading, error, reloadNotifs };
}
