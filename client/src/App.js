import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/login" element={<h1>Login</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
