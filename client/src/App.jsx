import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StatsView from './pages/StatsView';
import TaskList from './pages/TaskList';
import TimeTracking from './pages/TimeTracking';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/stats-view" element={<StatsView />} />
      </Routes>
    </Router>
  );
}
