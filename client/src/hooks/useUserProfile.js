import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserInfo } from "../services/user.api";

export default function useUserProfile() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const profile = await getUserInfo(token, user.sub);
        console.log("profile", profile);
        setUserProfile(profile);
      } catch (e) {
        setUserProfile(null);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  return { userProfile, isLoading };
}
