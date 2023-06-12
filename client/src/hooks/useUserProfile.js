import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo } from "../services/user.api";

/**
 * Return user info belonging to the current signed-in user.
 */
export default function useUserProfile() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await getUserInfo(token, user.sub);
        setUserProfile(response.data);
      } catch (e) {
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  return { userProfile, isLoading };
}
