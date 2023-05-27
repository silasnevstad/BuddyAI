import React, { useState, useRef, useEffect } from 'react';
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

function HomePage({ userId, documents, setDocuments, currentDocument }) {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [headstartModalOpen, setHeadstartModalOpen] = useState(false);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [sideView, setSideView] = useState(Math.random() < 0.5);
  const [isModified, setIsModified] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (documents.length > 0) {
      setText(documents[currentDocument].content);
      setPrompt(documents[currentDocument].title);
      setSources(documents[currentDocument].sources || []);
    }
  }, [documents, currentDocument]);

  useEffect(() => {
    setIsModified(true);
  }, [text, prompt, documents]);

  const handleSave = () => {
    if (documents.length > 0 && isModified) {
      const docId = documents[currentDocument].id;
      const sources = documents[currentDocument].sources || [];
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
                console.error(`Failed to update document ${docId}: `, response.error);
              }
          });
  
      // Still update local state
      const newDocuments = [...documents];
      newDocuments[currentDocument] = updatedContent;
      setDocuments(newDocuments);
  
      setIsModified(false);
    }
  };

  const addSource = (source) => {
    console.log(source);
    const docId = documents[currentDocument].id;
    const sources = documents[currentDocument].sources || [];
    const updatedContent = {
        id: docId,
        title: prompt,
        content: text,
        sources: [...sources, source]
    };
    
    updateUserDoc(userId, docId, updatedContent)
      .then(response => {
        if (response.success) {
        } else {
          console.error(`Failed to update document ${docId}: `, response.error);
        }
    });

    // Still update local state
    const newDocuments = [...documents];
    newDocuments[currentDocument] = updatedContent;
    setDocuments(newDocuments);
  };

  const deleteSource = (source) => {
    const docId = documents[currentDocument].id;
    const sources = documents[currentDocument].sources || [];
    const updatedContent = {
      id: docId,
      title: prompt,
      content: text,
      sources: sources.filter(s => s !== source)
    };

    updateUserDoc(userId, docId, updatedContent)
      .then(response => {
        if (response.success) {
        } else {
          console.error(`Failed to update document ${docId}: `, response.error);
        }
    });

    // Still update local state
    const newDocuments = [...documents];
    newDocuments[currentDocument] = updatedContent;
    setDocuments(newDocuments);
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
  
  const resetAbortController = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  const handleViewSwitch = () => {
    resetAbortController();
    setSideView(!sideView);
    setResponseText('');
  };

  return (
    <AbortContext.Provider value={{ abortController: abortControllerRef.current, resetAbortController }}>
      <Background>
        <div className="App">
          <header className="App-header">
            <Title hideMobile={true} loggedIn={userId !== ''} />
            <HeaderNav handleSave={handleSave} loggedIn={userId !== ''} />
          </header>
          <main className="App-main">
            <div className="custom-container">
              {/* <button className="transparent-button save-button" onClick={() => setModalOpen(true)}>Headstart</button> */}
              {/* <div className="cus-container"> */}
                <PromptInput prompt={prompt} setPrompt={setPrompt} />
              {/* </div> */}
              <div className="custom-button-container">
                <ViewSwitcher handleViewSwitch={handleViewSwitch} view={sideView} />
                <SourceButton setSourceModalOpen={setSourceModalOpen} />
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
                sources={documents[currentDocument]?.sources || []} 
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
                sources={documents[currentDocument]?.sources || []} 
              />
            }
            {!sideView && <InputButtons text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} isLoading={isLoading} setIsLoading={setIsLoading} prompt={prompt} sources={documents[currentDocument]?.sources || []}  />}
            <HeadstartModal open={headstartModalOpen} close={() => setHeadstartModalOpen(false)} text={text} setText={setText} />
            <SourceModal open={sourceModalOpen} close={() => setSourceModalOpen(false)} sources={documents[currentDocument]?.sources || []}  addSource={addSource} deleteSource={deleteSource} />
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
