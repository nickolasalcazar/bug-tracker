import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard";
import NavBar from "./components/NavBar/NavBar";
import NewTask from "./components/NewTask/NewTask";
import PageLoader from "./components/PageLoader";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Dashboard from "./pages/Dashboard";

export const UserContext = createContext(null);

function App() {
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
          path="/dashboard"
          element={<AuthenticationGuard component={Dashboard} />}
        />
        <Route
          path="/projects"
          element={<AuthenticationGuard component={Projects} />}
        />
        <Route
          path="/projects/new"
          element={<AuthenticationGuard component={NewProject} />}
        />
        <Route
          path="/tasks/new"
          element={<AuthenticationGuard component={NewTask} />}
        />
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
