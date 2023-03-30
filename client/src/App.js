import { useEffect, useState } from "react";
import "./App.css";
import Auth0Wrapper from "./components/auth0/Auth0Wrapper";
import LoginButton from "./components/auth0/LoginButton";
import LogoutButton from "./components/auth0/LogoutButton";

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
      <header className="App-header">
        {/* <p>{message}</p> */}
        <Auth0Wrapper>
          <LoginButton />
          <LogoutButton />
        </Auth0Wrapper>
      </header>
    </div>
  );
}

export default App;
