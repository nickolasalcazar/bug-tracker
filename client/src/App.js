import { createContext, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Amplify, Auth } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import AuthTest from "./pages/AuthTest";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value={undefined}>
      <div className="App">
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
