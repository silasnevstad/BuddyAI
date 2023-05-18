import React, { useState } from 'react';
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
// import StyleSlider from '../components/Slider';

function HomePage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState(2);
  const [prompt, setPrompt] = useState('');
  return (
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
          <TextInput text={text} setText={setText} style={style} prompt={prompt} />
          <InputButtons text={text} setText={setText} isLoading={isLoading} setIsLoading={setIsLoading} style={style} prompt={prompt} />
        </main>
        <footer className="App-footer">
          {isLoading && <Loader />}
          <Footer />
        </footer>
      </div>
    </Background>
  );
}

export default HomePage;
