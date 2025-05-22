import { useState } from "react";
import TaskForm from "../components/TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Function to handle adding new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Task List</h1>

      {/* Task creation form */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Task list */}
      <div className="mt-8 grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-600"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {task.description || "No description"}
              </p>
              <p className="text-gray-500 text-xs">
                Due:{" "}
                <span className="font-medium text-gray-700">
                  {task.dueDate}
                </span>
              </p>
              <p className="text-gray-400 text-xs">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
