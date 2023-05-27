import '../App.css';
import '../components/styles/HelpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import VenmoIcon from '../components/images/venmo.svg';

const HelpPage = ({ loggedIn }) => {
    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title loggedIn={loggedIn} />
                    <span style={{marginRight: "10px"}}><HeaderNav currentPage={"/help"} loggedIn={loggedIn}/></span>
                </header>
                <main className="App-main">
                    <div className="help-container">
                        <div className="help-inner-container">
                            <h1 className="help-header-text"> Welcome to Buddy! </h1>
                            <p className="help-header-desc-text"> Buddy is your friendly writing assistant tool, here to make your text generation experience a breeze. Whether you're crafting an essay, composing an email, or brainstorming ideas, our AI-powered buddy is here to help you find the perfect words and phrases effortlessly. </p>
                            <p className="help-header-desc-text"> Buddy is an AI co-writer that interacts with you in two modes: Side by Side and Regular. Side by Side lets you type with Buddy restructuring and enhancing your text in real-time. Regular mode shows suggestions as you type, which you can accept by clicking or using the tab key. Both modes provide access to synonyms, and Regular mode adds tools for text formalization, enhancement, and AI content queries.</p>
                            
                            <h2 className="help-sub-header-text"> Getting Started </h2>
                            <ul className="help-list">
                                <li className="help-list-item step1">
                                    <div className="help-step">1</div>
                                    <div className="help-instruction">
                                        Optionally, tell Buddy what you're writing to give context and help guide its suggestions.
                                    </div>
                                </li>
                                <li className="help-list-item step2">
                                    <div className="help-step">2</div>
                                    <div className="help-instruction">
                                        Start typing, whether it's a few words, a sentence, or even a whole paragraph!
                                    </div>
                                </li>
                                <li className="help-list-item step3">
                                    <div className="help-step">3</div>
                                    <div className="help-instruction">
                                        Buddy monitors your input as you type. After a 750ms debounce effect, if no typing is detected, Buddy uses its AI to suggest the best continuation or version for your text.
                                    </div>
                                </li>
                                <li className="help-list-item step4">
                                    <div className="help-step">4</div>
                                    <div className="help-instruction">
                                        Buddy's AI system generates tailored suggestions for you. These appear in a dropdown below the text box. You can accept a suggestion by pressing Tab, clicking on it, or just continue typing.
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <h2 className="help-sub-header-text-center"> Plus, more features! </h2>
                        <div className="help-grid">
                            {/* <div className="help-grid-item"> <span className="help-grid-item-bold"> 🖌️ </span>  Choose from five different writing styles, ranging from formal to casual, using the slider provided. </div> */}
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🔄 </span>  Synonym, double click on any word and buddy will suggest synonyms for you (on mobile hold any word). </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🖋️ </span> Formalize text, instantly transform your writing into a more formal style, ideal for professional or academic purposes. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> ✨ </span> Improve the overall quality of your text with grammar corrections, enhanced sentence structures, and a polished touch. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> ❓ </span> Quickly get answers to your queries or seek clarification on any aspect of your writing. </div>
                            <div className="help-grid-item"> <span className="help-grid-item-bold"> 🗑️  </span> Clear input, Start afresh by clearing the text box, giving you a clean canvas to work on. </div>
                        </div>

                        <h2 className="help-sub-header-text-center small"> Enjoy using Buddy? Buy me a coffee ☕️ </h2>
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