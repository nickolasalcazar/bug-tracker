import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import AuthTest from "./pages/AuthTest";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const attributes = cognitoUser.attributes;
        // console.log("attributes", attributes);
        setUser(attributes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth-test" element={<AuthTest />} />
          <Route />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default withAuthenticator(App);
