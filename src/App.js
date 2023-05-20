import React, { useState, useEffect } from 'react';
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
  const [currentDocument, setCurrentDocument] = useState(0);
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  let currentUser = null;

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        currentUser = user;
        setUserId(user.uid);
      
      } else {
        // User is signed out
        currentUser = null;
        setUserId('');
      }
    });
  }, []);

  useEffect(() => {
    if (userId === '') {
      return;
    }

    const fetchDocuments = async () => {
      getUserDocs(userId).then(documentList => {
        setDocuments(documentList);
      });
    };
    fetchDocuments();
  }, [userId]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<DocumentPage userId={userId} documents={documents} setDocuments={setDocuments} setCurrentDocument={setCurrentDocument} loggedIn={userId !== ''} />} />
          <Route path="/home" element={<HomePage userId={userId}  documents={documents} setDocuments={setDocuments}  currentDocument={currentDocument} />} />
          <Route path="/account" element={<AccountPage userId={userId} loggedIn={userId !== ''} />} />
          <Route path="/help" element={<HelpPage loggedIn={userId !== ''} />} />
          <Route path="/api" element={<ApiPage loggedIn={userId !== ''} />} />
          <Route path="/signup" element={<SignUpPage setUserId={setUserId} setLoggedIn={setLoggedIn}  />} />
          <Route path="/login" element={<LoginPage setUserId={setUserId} setLoggedIn={setLoggedIn} />} />
        </Routes>
    </Router>
  );
}

export default App;
