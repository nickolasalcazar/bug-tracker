import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createTask } from "../../services/task.api";

import "./NewTask.css";

/**
 * Renders a form for creating a new task.
 */
export default function NewTask() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const response = await createTask(accessToken, formData);
    console.log(response);
  };

  return (
    <div className="new-task">
      <form action="">
        <input
          type="text"
          id="task-title"
          name="title"
          required
          aria-required="true"
          aria-label="Task Title"
          placeholder="Enter task title"
          onChange={handleTextChange}
        />
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          aria-label="Description"
          placeholder="Enter task description"
          rows={5}
          onChange={handleTextChange}
        ></textarea>
        <div>
          <label htmlFor="subscribers">Subscribers</label>
          <input
            type="text"
            id="subscribers"
            name="subscribers"
            aria-required="true"
            aria-label="Subscribers"
            placeholder="Enter subscribers"
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            aria-required="true"
            aria-label="tags"
            placeholder="Enter tags"
          />
        </div>
        <button onClick={handleSubmit} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
