import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getTaskById } from "../services/task.api";

/**
 * Fetches a single task. The ID of the task is obtained as a URL parameter.
 */
export default function useGetTaskByParam() {
  const { getAccessTokenSilently } = useAuth0();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id = null } = useParams();

  useEffect(() => {
    if (id === null) {
      setError(true);
      setIsLoading(false);
      return;
    }
    const fetchTask = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await getTaskById(token, id);
        if (response.status !== 200) throw Error(response.statusText);
        setTask(response.data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [id]);
  return { task, isLoading, error };
}
