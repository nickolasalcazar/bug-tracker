import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getOwnedTasks, getSubscribedTasks } from "../services/task.api";

export const TasksContext = createContext("tasksContext -- initial");

export const TasksProvider = ({ children }) => {
  const initialVal = {
    tasks: null,
    isLoading: true,
    error: false,
  };
  const [tasksContext, setTasksContext] = useState(initialVal);
  const [currMethod, setCurrMethod] = useState("subscribed");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const updateTasksContext = async (method = null) => {
    if (!isAuthenticated) {
      setTasksContext({
        tasks: null,
        isLoading: false,
        error: true,
      });
      return;
    }
    const token = await getAccessTokenSilently();
    let response;

    if (method !== null) setCurrMethod(method);
    response =
      (method ?? currMethod) === "owned"
        ? await getOwnedTasks(token)
        : await getSubscribedTasks(token);

    setTasksContext({
      tasks: response.data,
      isLoading: false,
      error: response.status !== 200,
    });
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
