import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/auth0/AuthenticationGuard";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { TasksProvider } from "./context/TasksContext";
import AppLayout from "./AppLayout";
import TaskForm from "./components/TaskForm";
import Homepage from "./pages/Homepage";
import User from "./pages/User/User";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Dashboard from "./pages/Dashboard";

function App() {
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
        <TasksProvider>
          <Routes>
            <Route element={<LayoutWrapper />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
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
                  <h1>
                    404: Sorry, the page you are looking for does not exist
                  </h1>
                }
              />
            </Route>
          </Routes>
        </TasksProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
