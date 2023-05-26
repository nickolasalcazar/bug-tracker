import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard";
import AppLayout from "./AppLayout";
import NewTask from "./components/NewTask";
import PageLoader from "./components/PageLoader";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Dashboard from "./pages/Dashboard/Dashboard";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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

  const themeLight = createTheme({
    palette: {
      background: {
        default: "#f6f8fa",
      },
      primary: {
        main: "#f63628", // Background color of navbar and other major components
      },
      secondary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
  });

  const themeDark = createTheme({
    palette: {
      background: {
        default: "#222222",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const AppLayoutWrapper = ({ disableDrawer }) => (
    <AppLayout disableDrawer={disableDrawer}>
      <Outlet />
    </AppLayout>
  );

  return (
    <ThemeProvider theme={themeLight}>
      <div className="App">
        <CssBaseline />
        <Routes>
          <Route element={<AppLayoutWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AppLayoutWrapper disableDrawer={true} />}>
            <Route path="/" element={<Homepage />} />
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
          </Route>
          {/* Old navigation */}
          {/* <NavBar />
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
          />*/}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
