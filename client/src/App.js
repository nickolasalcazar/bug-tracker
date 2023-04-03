import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard";
import NavBar from "./components/NavBar";
import PageLoader from "./components/PageLoader";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="App">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={Profile} />}
        />
        <Route
          path="*"
          element={
            <h1>404: Sorry, the page you are looking for does not exist</h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
