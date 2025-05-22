import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Task title is required.";
    if (!dueDate) newErrors.dueDate = "Due date is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description (optional)"
        />
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
