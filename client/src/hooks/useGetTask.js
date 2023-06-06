import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getTaskById } from "../services/task.api";

// export default function useGetTask({ id }) {
export default function useGetTask() {
  const { getAccessTokenSilently } = useAuth0();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await getTaskById(token, id);
        console.log(response);
        setTask(response.data);
      } catch (e) {
        setTask(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [id]);
  return { task, isLoading };
}
