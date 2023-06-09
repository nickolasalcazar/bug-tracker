import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllSubscribedTasks } from "../services/task.api";

export const TasksContext = createContext("tasksContext -- initial");

export const TasksProvider = ({ children }) => {
  const initialVal = {
    tasks: null,
    isLoading: true,
    error: false,
  };
  const [tasksContext, setTasksContext] = useState(initialVal);
  const { getAccessTokenSilently } = useAuth0();

  // Fetch up-to-date tasks and update the current tasks context
  const updateTasksContext = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getAllSubscribedTasks(token);
      setTasksContext({
        tasks: response.data,
        isLoading: false,
        error: false,
      });
    } catch (e) {
      setTasksContext({
        tasks: null,
        isLoading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    updateTasksContext();
  }, []);

  return (
    <TasksContext.Provider value={{ tasksContext, updateTasksContext }}>
      {children}
    </TasksContext.Provider>
  );
};
