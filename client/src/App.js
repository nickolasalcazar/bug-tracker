import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/message")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
