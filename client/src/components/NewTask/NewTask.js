import React from "react";

import "./NewTask.css";

/**
 * Renders a form for creating a new task.
 */
export default function NewTask() {
  return (
    <div className="new-task">
      {/* <h2>New Task</h2> */}
      <form>
        <input
          type="text"
          id="task-title"
          name="task-title"
          required
          aria-required="true"
          aria-label="Task Title"
          placeholder="Enter task title"
        />
        <textarea
          id="description"
          name="description"
          required
          aria-required="true"
          aria-label="Description"
          placeholder="Enter task description"
          rows={5}
        ></textarea>
        <div>
          <label hmtlFor="subscribers">Subscribers</label>
          <input
            type="text"
            id="subscribers"
            name="subscribers"
            required
            aria-required="true"
            aria-label="Subscribers"
            placeholder="Enter subscribers"
          />
        </div>
        <div>
          <label hmtlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
            aria-required="true"
            aria-label="tags"
            placeholder="Enter tags"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
