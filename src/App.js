import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import SidePage from './screens/SidePage';
import HelpPage from './screens/HelpPage';
import ApiPage from './screens/ApiPage';
// import SignUpPage from './screens/SignUpPage';
import './App.css';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/side" element={<SidePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/api" element={<ApiPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
