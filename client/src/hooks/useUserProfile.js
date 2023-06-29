import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, getUserInfo } from "../services/user.api";

/**
 * Return user info belonging to the current signed-in user.
 */
export default function useUserProfile() {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        setUserProfile(null);
        return;
      }
      try {
        const token = await getAccessTokenSilently();
        const response = await getUserInfo(token, user.sub);
        if (response.status === 404) {
          await createUser(token, user);
          navigate(0);
        }
        setUserProfile(response.data);
      } catch (e) {
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [isAuthenticated]);

  return { userProfile, isLoading };
}
