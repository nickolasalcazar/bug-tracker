import React, { useState, useEffect } from "react";

function Homepage({}) {
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
    <div>
      <h1>Homepage</h1>
      <p>{message}</p>
    </div>
  );
}

export default Homepage;
