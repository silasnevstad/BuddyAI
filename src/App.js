import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentPage from './screens/DocumentPage';
import HomePage from './screens/HomePage';
import AccountPage from './screens/AccountPage';
import HelpPage from './screens/HelpPage';
import ApiPage from './screens/ApiPage';
import SignUpPage from './screens/SignUpPage';
import LoginPage from './screens/LoginPage';
import './App.css';
import { getUserDocs, onAuthStateChanged, auth } from './components/firebase';

function App() {
  const [documents, setDocuments] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUserId(user.uid);
      } else {
        // User is signed out
        setUserId('');
      }
    });
  }, []);

  const fetchDocuments = useCallback(async () => {
    getUserDocs(userId).then(documentList => {
      setDocuments(documentList);
    });
  }, [userId]);

  useEffect(() => {
    if (userId === '') {
      return;
    }

    fetchDocuments();
  }, [userId, fetchDocuments]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage userId={userId} documents={documents} setDocuments={setDocuments} />} />
          <Route path="/docs/:id" element={<HomePage userId={userId} documents={documents} setDocuments={setDocuments} fetchDocuments={fetchDocuments} />} />
          <Route path="/account" element={<AccountPage userId={userId} loggedIn={userId !== ''} />} />
          <Route path="/help" element={<HelpPage loggedIn={userId !== ''} />} />
          <Route path="/api" element={<ApiPage userId={userId} />} />
          <Route path="/signup" element={<SignUpPage setUserId={setUserId}  />} />
          <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
        </Routes>
    </Router>
  );
}

export default App;
