import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getOwnedTasks, getSubscribedTasks } from "../services/task.api";
// TODO: Implement getAllTasks so user can view tabs 'subscribed', 'my tasks' and 'all'
// import { getAllTasks, getOwnedTasks, getSubscribedTasks } from "../services/task.api";

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

    if (method !== null) setCurrMethod(method);
    else method = currMethod;

    let response;
    if (currMethod === "owned") response = await getOwnedTasks(token);
    else if (currMethod === "subscribed")
      response = await getSubscribedTasks(token);
    // else if (currMethod === "all") response = await getAllTasks(token);

    setTasksContext({
      tasks: response.data,
      isLoading: false,
      error: response.status !== 200,
    });
  };

  useEffect(() => {
    updateTasksContext();
  }, [currMethod, isAuthenticated]);

  return (
    <TasksContext.Provider value={{ tasksContext, updateTasksContext }}>
      {children}
    </TasksContext.Provider>
  );
};
