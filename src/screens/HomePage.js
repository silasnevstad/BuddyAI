import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import '../components/styles/HomePage.css';
import PromptInput from '../components/PromptInput';
import ViewSwitcher from '../components/ViewSwitcher';
import HeadstartModal from '../components/HeadstartModal';
import TextInput from '../components/TextInput';
import SideTextInput from '../components/SideTextInput';
import InputButtons from '../components/InputButtons';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AbortContext } from '../components/AbortContext';
import { updateUserDoc } from '../components/firebase';

function HomePage({ userId, documents, setDocuments, currentDocument }) {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [style, setStyle] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [sideView, setSideView] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (documents.length > 0) {
      setText(documents[currentDocument].content);
      setPrompt(documents[currentDocument].title);
    }
  }, [documents, currentDocument]);

  useEffect(() => {
    setIsModified(true);
  }, [text, prompt]);

  const handleSave = () => {
    if (documents.length > 0 && isModified) {
      const docId = documents[currentDocument].id;
      const updatedContent = {
          id: docId, // Keep the id here
          title: prompt,
          content: text,
      };
  
      updateUserDoc(userId, docId, updatedContent)
          .then(response => {
              if (response.success) {
              } else {
                  // console.error(`Failed to update document ${docId}: `, response.error);
              }
          });
  
      // Still update local state
      const newDocuments = [...documents];
      newDocuments[currentDocument] = updatedContent;
      setDocuments(newDocuments);
  
      setIsModified(false);
    }
  };

  // save document every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isModified) {
        setIsSaving(true);
        handleSave();
        setIsSaving(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [documents, currentDocument, prompt, text, isModified]);

  const handleViewSwitch = () => {
    // abort any pending requests
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    setSideView(!sideView);
    setResponseText('');
  };
  
  const resetAbortController = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  return (
    <AbortContext.Provider value={{ abortController: abortControllerRef.current, resetAbortController }}>
      <Background>
        <div className="App">
          <header className="App-header">
            <Title hideMobile={true} />
            <HeaderNav handleSave={handleSave} loggedIn={userId !== ''} />
          </header>
          <main className="App-main">
            <div className="custom-container">
              <button className="transparent-button save-button" onClick={() => setModalOpen(true)}>Headstart</button>
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              <ViewSwitcher handleViewSwitch={handleViewSwitch} view={sideView} />
            </div>
            {sideView ? 
              <SideTextInput text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} style={style} prompt={prompt} isLoading={isLoading} setIsLoading={setIsLoading} />
            : <TextInput text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} style={style} prompt={prompt} isLoading={isLoading} setIsLoading={setIsLoading} />}
            {!sideView && <InputButtons text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} isLoading={isLoading} setIsLoading={setIsLoading} style={style} prompt={prompt} />}
            <HeadstartModal open={modalOpen} close={() => setModalOpen(false)} text={text} setText={setText} />
          </main>
          <footer className="App-footer">
            {isLoading && <Loader />}
            {isSaving && <p className="saving-text">Saving...</p>}
            <Footer />
          </footer>
        </div>
      </Background>
    </AbortContext.Provider>
  );
}

export default HomePage;
