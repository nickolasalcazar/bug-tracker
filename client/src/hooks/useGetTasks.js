import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllSubscribedTasks } from "../services/task.api";

// Only fetches tasks that the user is subscribed to
export default function useGetTasks() {
  const { getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await getAllSubscribedTasks(token);
        // console.log("useGetTasks:", response);
        setTasks(response.data);
        setError(false);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [getAccessTokenSilently]);

  return { tasks, isLoading, error };
}
