import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './view/Home';
import SignIn from './view/SignIn';
import Calendar from './Calendar';
import GroupCalendarHeatmap from './GroupCalendarHeatmap'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/heatmap" element={<GroupCalendarHeatmap groupId="testGroup" />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;