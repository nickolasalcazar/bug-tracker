import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByUsername } from "../services/user.api";

/**
 * Hook for fetching public details of particular user by their username.
 */
export default function useGetUser(username) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const fetchUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getUserByUsername(token, username);
      // console.log("useGetUser response", response);
      setUser(response.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Include username in dependency array?

  return { user, isLoading, error };
}
