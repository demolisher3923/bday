// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Greeting from './components/Greeting';
import BirthdayCard from './components/BirthdayCard';
import CakeCatchGame from './components/CakeCatchGame';
import './App.css';

function App() {
  return (
    <Router>
      {/* NEW: This div is now the main container for the entire app */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/card" element={<BirthdayCard />} />
          <Route path="/game" element={<CakeCatchGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;