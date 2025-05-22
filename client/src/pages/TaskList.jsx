import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks');
        if (!res.ok) throw new Error(`Failed to fetch tasks. Status: ${res.status}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('🚨 Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error(`Failed to add task. Status: ${res.status}`);

      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('🚨 Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>📝 Task List</h2>
      <TaskForm onAddTask={addTask} />
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
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
            <div>
              <strong>{task.title}</strong> – {task.description} (Due: {new Date(task.dueDate).toLocaleDateString()})
            </div>
            <button
              onClick={() => deleteTask(task.id)}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
