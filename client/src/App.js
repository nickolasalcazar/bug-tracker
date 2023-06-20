import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";

import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard";
import AppLayout from "./AppLayout";
import TaskForm from "./components/TaskForm";
import PageLoader from "./components/PageLoader";
import Homepage from "./pages/Homepage";
import User from "./pages/User/User";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";

import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { TasksProvider } from "./context/TasksContext";
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

  // Specify auth for route; determine layout for route
  const LayoutWrapper = ({ requireAuth = true, renderLeftDrawer = true }) => {
    const layoutComponent = () => (
      <AppLayout renderLeftDrawer={renderLeftDrawer}>
        <Outlet />
      </AppLayout>
    );
    return requireAuth ? (
      <AuthenticationGuard component={layoutComponent} />
    ) : (
      layoutComponent()
    );
  };

  return (
    <ThemeProvider theme={themeLight}>
      <div className="App">
        <CssBaseline />
        <Routes>
          <Route element={<LayoutWrapper />}>
            <Route
              path="/dashboard/*"
              element={
                <TasksProvider>
                  <Dashboard />
                </TasksProvider>
              }
            />
          </Route>
          <Route element={<LayoutWrapper />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/task/new" element={<TaskForm />} />
            <Route path="/user/*">
              <Route path=":username/*" element={<User />} />
              <Route path="*" element={<User />} />
            </Route>
          </Route>
          <Route element={<LayoutWrapper requireAuth={false} />}>
            <Route path="/" element={<Homepage />} />
            <Route
              path="*"
              element={
                <h1>404: Sorry, the page you are looking for does not exist</h1>
              }
            />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
