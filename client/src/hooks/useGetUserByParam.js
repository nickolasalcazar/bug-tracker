import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByUsername } from "../services/user.api";

/**
 * This hook listens for a username passed as a URL parameter and returns the
 * public user information and connection status in relation to the logged-in user.
 */
function useGetUserByParam() {
  const { username } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getUserByUsername(token, username);
      if (response.status === 404) setError("Error 404: User not found. Typo?");
      else if (response.status !== 200) throw Error(response.statusText);
      setUser(response.data);
    } catch (e) {
      setError("An error occurred loading the profile");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return { user, isLoading, error, refreshUser };
}

export default useGetUserByParam;
