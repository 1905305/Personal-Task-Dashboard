import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TimeTracking from './pages/TimeTracking';
import StatsView from './pages/StatsView';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/stats" element={<StatsView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
