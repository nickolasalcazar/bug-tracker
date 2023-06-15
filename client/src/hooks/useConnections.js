import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
      const response = await getPendingConnections(token);
      setConnections(response.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }

    const reloadConnections = () => {
      fetchConnections();
    };

    useEffect(() => {
      fetchConnections();
    });
  };

  return { connections, isLoading, error, reloadConnections };
}
