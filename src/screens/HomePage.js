import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import '../components/styles/HomePage.css';
import PromptInput from '../components/PromptInput';
import ViewSwitcher from '../components/ViewSwitcher';
import HeadstartModal from '../components/HeadstartModal';
import TextInput from '../components/TextInput';
import SideTextInput from '../components/SideTextInput';
import InputButtons from '../components/InputButtons';
import SourceButton from '../components/SourceButton';
import SourceModal from '../components/SourceModal';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AbortContext } from '../components/AbortContext';
import { updateUserDoc } from '../components/firebase';

function HomePage({ userId, documents, setDocuments, fetchDocuments }) {
  let { id } = useParams();
  const [currentDocument, setCurrentDocument] = useState(null);
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [sources, setSources] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDocument, setIsLoadingDocument] = useState(true);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [headstartModalOpen, setHeadstartModalOpen] = useState(false);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [sideView, setSideView] = useState(Math.random() < 0.5);
  const [isModified, setIsModified] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (userId === '') {
      setIsLoadingDocument(false);
      return;
    } else if (documents.length === 0) {
      setIsDocumentsLoading(true);
      fetchDocuments().then(() => {
        setIsDocumentsLoading(false);
      });
    } else if (documents.length > 0) {
      setIsDocumentsLoading(false);
    }
  
    if (!isDocumentsLoading) {
      const doc = documents.find((doc) => doc.id === id);
      if (doc) {
        setCurrentDocument(doc);
        setText(doc.content);
        setPrompt(doc.title);
        setSources(doc.sources || []);
        setIsLoadingDocument(false);  // Set loading to false once the document is found
      }
    }
  }, [id, userId, isDocumentsLoading, fetchDocuments]);

  useEffect(() => {
    setIsModified(true);
  }, [text, prompt, sources]);

  const handleSave = useCallback(() => {
    if (userId === '') {
      setIsModified(false);
      return;
    }
    if (documents.length > 0 && isModified) {
      const docId = currentDocument.id;
      const sources = currentDocument.sources || [];
      const updatedContent = {
          id: docId,
          title: prompt,
          content: text,
          sources: sources
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
      setCurrentDocument(updatedContent);
    }
    setIsModified(false);
  }, [documents, currentDocument, prompt, text, userId, isModified, setDocuments]);

  const addSource = (source) => {
    const docId = currentDocument.id;
    const sources = currentDocument.sources || [];
    const updatedContent = {
        id: docId,
        title: prompt,
        content: text,
        sources: [...sources, source]
    };
    
    if (userId === '') {
      setCurrentDocument(updatedContent);
      setSources(updatedContent.sources);
      return;
    }
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
    setCurrentDocument(updatedContent);
    setSources(updatedContent.sources);
  };

  const deleteSource = (source) => {
    const docId = currentDocument.id;
    const sources = currentDocument.sources || [];
    const updatedContent = {
      id: docId,
      title: prompt,
      content: text,
      sources: sources.filter(s => s !== source)
    };

    if (userId === '') {
      setCurrentDocument(updatedContent);
      setSources(updatedContent.sources);
      return;
    }

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
    setCurrentDocument(updatedContent);
    setSources(updatedContent.sources);
  };


  // save document every 5 seconds
  useEffect(() => {
    if (userId === '') {
      return;
    }
    const interval = setInterval(() => {
      if (isModified) {
        setIsSaving(true);
        handleSave();
        setIsSaving(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [prompt, text, isModified, handleSave]);
  
  const resetAbortController = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  const handleViewSwitch = () => {
    resetAbortController();
    setSideView(!sideView);
    setResponseText('');
  };

  if (isLoadingDocument) {
    return  (
      <Background>
        <div className="App">
          <header className="App-header">
            <Title hideMobile={true} loggedIn={userId !== ''} />
            <HeaderNav handleSave={handleSave} loggedIn={userId !== ''} />
          </header>
          <main className="App-main">
            <div className="custom-container">
              <Loader />
            </div>
          </main>
          <Footer />
        </div>
      </Background>
    );
  }

  return (
    <AbortContext.Provider value={{ abortController: abortControllerRef.current, resetAbortController }}>
      <Background>
        <div className="App">
          <header className="App-header">
            <Title hideMobile={true} loggedIn={userId !== ''} />
            {window.innerWidth > 768 && <HeaderNav handleSave={handleSave} loggedIn={userId !== ''} />}
          </header>
          <main className="App-main" style={{paddingTop: window.innerWidth > 768 ? '0px' : '0px'}}>
            <div className="custom-container">
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              <div className="custom-button-container">
                <ViewSwitcher handleViewSwitch={handleViewSwitch} view={sideView} />
                {/* <button className={window.innerWidth > 768 ? "full-button" : "transparent-button"} onClick={() => setHeadstartModalOpen(true)}>Headstart</button> */}
                {/* <SourceButton setSourceModalOpen={setSourceModalOpen} /> */}
              </div>
            </div>
            {sideView ? 
              <SideTextInput 
                text={text} 
                responseText={responseText} 
                setText={setText} 
                setResponseText={setResponseText} 
                prompt={prompt} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                signal={abortControllerRef.current.signal} 
                sources={sources} 
              />
            : <TextInput 
                text={text}
                responseText={responseText}
                setText={setText}
                setResponseText={setResponseText}
                prompt={prompt}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                signal={abortControllerRef.current.signal}
                sources={sources} 
              />
            }
            {<InputButtons text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} isLoading={isLoading} setIsLoading={setIsLoading} prompt={prompt} sources={sources} setHeadstartModalOpen={setHeadstartModalOpen} setSourceModalOpen={setSourceModalOpen} />}
            <HeadstartModal open={headstartModalOpen} close={() => setHeadstartModalOpen(false)} text={text} setText={setText} />
            <SourceModal open={sourceModalOpen} close={() => setSourceModalOpen(false)} sources={sources}  addSource={addSource} deleteSource={deleteSource} />
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
