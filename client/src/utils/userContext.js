import { createContext, useContext } from "react";
// import { UserContext } from "../App";

const UserContext = createContext(null);

export default user = useContext(UserContext);

export function UserContextProvider({ children }) {}
