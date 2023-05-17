import React, { useState } from 'react';
import '../App.css';
import TextInput from '../components/TextInput';
import InputButtons from '../components/InputButtons';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import StyleSlider from '../components/Slider';

function HomePage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState(2);
  return (
    <Background>
      <div className="App">
        <header className="App-header">
          <Title />
          <HeaderNav currentPage={'/'} />
        </header>
        <main className="App-main">
          <StyleSlider value={style} setValue={setStyle} />
          <TextInput text={text} setText={setText} style={style} />
          <InputButtons text={text} setText={setText} isLoading={isLoading} setIsLoading={setIsLoading} style={style} />
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
