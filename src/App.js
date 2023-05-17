import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import HelpPage from './screens/HelpPage';
import ApiPage from './screens/ApiPage';
import Title from './components/Title';
// import SignUpPage from './screens/SignUpPage';
import HeaderNav from './components/HeaderNav';
import './App.css';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/api" element={<ApiPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
