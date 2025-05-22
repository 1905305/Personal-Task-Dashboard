import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
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
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    if (!id) {
      console.error('Invalid task id:', id);
      return;
    }
    console.log('Deleting task with id:', id);

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete task: ${errorText}`);
      }

      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      console.log('Task deleted and state updated');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm onAddTask={addTask} />
      <ul>
        {tasks.map((task) => {
          console.log('Rendering task:', task);
          return (
            <li key={task._id} style={{ marginBottom: '10px' }}>
              <strong>{task.title}</strong> – {task.description} (Due: {new Date(task.dueDate).toLocaleDateString()})
              <button
                onClick={() => deleteTask(task._id)}
                style={{ marginLeft: '15px', color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
