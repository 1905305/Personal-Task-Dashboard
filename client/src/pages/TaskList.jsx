import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';



// Helper to get headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Token in headers:', token);
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

// Wrapper fetch to include auth headers and error handling
const fetchWithAuth = async (url, options = {}) => {
  const headers = getAuthHeaders();
  options.headers = { ...headers, ...options.headers };

  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
};

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchWithAuth('http://localhost:5000/api/tasks');
        setTasks(data);
      } catch (error) {
        setError(error.message);
        console.error('🚨 Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await fetchWithAuth('http://localhost:5000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      setError(error.message);
      console.error('🚨 Error adding task:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      const updatedTask = await fetchWithAuth(`http://localhost:5000/api/tasks/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
      });
      setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      setEditingTask(null);
    } catch (error) {
      setError(error.message);
      console.error('🚨 Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetchWithAuth(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      setError(error.message);
      console.error('🚨 Error deleting task:', error);
    }
  };

  const cancelEdit = () => setEditingTask(null);

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterStatus === 'incomplete' && task.completed) return false;
    if (
      searchTerm &&
      !task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>📝 Task List</h2>

      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
        cancelEdit={cancelEdit}
      />

      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginBottom: 10,
          }}
        />
      </div>

      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <button
          onClick={() => setFilterStatus('all')}
          style={{
            marginRight: 10,
            padding: '8px 12px',
            backgroundColor: filterStatus === 'all' ? '#007bff' : '#eee',
            color: filterStatus === 'all' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          style={{
            marginRight: 10,
            padding: '8px 12px',
            backgroundColor: filterStatus === 'completed' ? '#28a745' : '#eee',
            color: filterStatus === 'completed' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilterStatus('incomplete')}
          style={{
            padding: '8px 12px',
            backgroundColor: filterStatus === 'incomplete' ? '#dc3545' : '#eee',
            color: filterStatus === 'incomplete' ? 'white' : 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Incomplete
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => updateTask({ ...task, completed: !task.completed })}
              />
              <strong>{task.title}</strong> – {task.description} (Due:{' '}
              {new Date(task.dueDate).toLocaleDateString()})
            </div>
            <div>
              <button
                onClick={() => setEditingTask(task)}
                style={{
                  marginRight: '8px',
                  color: 'white',
                  backgroundColor: 'blue',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  color: 'white',
                  backgroundColor: 'red',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
