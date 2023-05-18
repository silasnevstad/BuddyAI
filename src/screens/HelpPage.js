import '../App.css';
import '../components/styles/HelpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import VenmoIcon from '../components/images/venmo.svg';

const HelpPage = () => {
    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title />
                    <span style={{marginRight: "10px"}}><HeaderNav currentPage={"/help"} /></span>
                </header>
                <main className="App-main">
                    <div className="help-container">
                        <div className="help-inner-container">
                            <h1 className="help-header-text"> Welcome to Buddy! </h1>
                            <p className="help-header-desc-text"> Buddy is your friendly writing assistant tool, here to make your text generation experience a breeze. Whether you're crafting an essay 📝, composing an email 📧, or brainstorming ideas 💡, our AI-powered auto-complete feature is here to help you find the perfect words and phrases effortlessly. </p>
                            <h2 className="help-sub-header-text"> Getting Started </h2>
                            <ul className="help-list">
                                <span className="help-list-item-bold">0️⃣</span>
                                <li className="help-list-item">Optionally, give Buddy context on what you'd like to write.</li>
                                <span className="help-list-item-bold">1️⃣</span>
                                <li className="help-list-item">Start typing in the text box provided, whether it's a few words, a sentence, or even a whole paragraph!</li>
                                <span className="help-list-item-bold">2️⃣</span>
                                <li className="help-list-item">Buddy monitors your input as you type. After a 750ms debounce effect ⏱️, if no typing is detected, Buddy uses it's AI to suggest the best continuation for your text.</li>
                                <span className="help-list-item-bold">3️⃣</span>
                                <li className="help-list-item">Buddy's AI system generates tailored suggestions for you. These appear in a dropdown below the text box. You can accept a suggestion by pressing Tab, clicking on it, or just continue typing.</li>
                            </ul>
                        </div>
                        <h2 className="help-sub-header-text-center"> Plus, more features! </h2>
                        <div className="help-grid">
                            {/* <div className="help-grid-item"> <span className="help-grid-item-bold"> 🖌️ </span>  Choose from five different writing styles, ranging from formal to casual, using the slider provided. </div> */}
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🎩 </span> Formalize Text: Instantly transform your writing into a more formal style, ideal for professional or academic purposes. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🔄 </span>  Synonym, double click on any word and buddy will suggest synonyms for you. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> ✨ </span> Nicefy: Improve the overall quality of your text with grammar corrections, enhanced sentence structures, and a polished touch. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> ❓ </span> Ask: Quickly get answers to your queries or seek clarification on any aspect of your writing. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🗑️  </span> Clear Input: Start afresh by clearing the text box, giving you a clean canvas to work on. </div>
                        </div>

                        <h2 className="help-sub-header-text-center small"> Enjoy using Buddy? Buy me a coffee ☕️ 😉 </h2>
                        {/* get venmo logo and link to https://account.venmo.com/u/buddyai */}
                        <img src={VenmoIcon} alt="Venmo Icon" className="venmo-icon" onClick={() => window.open("https://account.venmo.com/u/buddyai", "_blank")} />
                    </div>
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default HelpPage;