import React from "react";

export default function NewProject({}) {
  return (
    <div>
      <h1>New Project</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" aria-label="Name" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            aria-label="Description"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
