import React from "react";

import "./NewTask.css";

/**
 * Renders a form for creating a new task.
 * @param {*} props
 * @returns
 */
export default function NewTask({}) {
  return (
    <div>
      <h2>New Task</h2>
      <form>
        <label htmlFor="task-title">Task Title</label>
        <input
          type="text"
          id="task-title"
          name="task-title"
          required
          aria-required="true"
          aria-label="Task Title"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          aria-label="Description"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
