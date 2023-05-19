import React, { useState, useRef } from 'react';
import '../App.css';
import '../components/styles/HomePage.css';
import PromptInput from '../components/PromptInput';
import TextInput from '../components/TextInput';
import InputButtons from '../components/InputButtons';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AbortContext } from '../components/AbortContext';
// import StyleSlider from '../components/Slider';

function HomePage() {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState(2);
  const [prompt, setPrompt] = useState('');
  const abortControllerRef = useRef(new AbortController());
  
  const resetAbortController = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  return (
    <AbortContext.Provider value={{ abortController: abortControllerRef.current, resetAbortController }}>
      <Background>
        <div className="App">
          <header className="App-header">
            <Title />
            <HeaderNav currentPage={'/'} />
          </header>
          <main className="App-main">
            <div className="custom-container">
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              {/* <StyleSlider value={style} setValue={setStyle} /> */}
            </div>
            <TextInput text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} style={style} prompt={prompt} isLoading={isLoading} />
            <InputButtons text={text} responseText={responseText} setText={setText} setResponseText={setResponseText} isLoading={isLoading} setIsLoading={setIsLoading} style={style} prompt={prompt} />
          </main>
          <footer className="App-footer">
            {isLoading && <Loader />}
            <Footer />
          </footer>
        </div>
      </Background>
    </AbortContext.Provider>
  );
}

export default HomePage;
