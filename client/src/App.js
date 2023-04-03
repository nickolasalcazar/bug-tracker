import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
