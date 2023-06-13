import React, { useState } from 'react';
import '../App.css';
import '../components/styles/HelpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import ViewSwitcher from '../components/ViewSwitcher';
import Footer from '../components/Footer';
import VenmoIcon from '../components/images/venmo.svg';

const HelpPage = ({ loggedIn }) => {
    const [view, setView] = useState(true);

    const handleViewSwitch = () => {
        setView(!view);
    };

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
                            <p className="help-header-desc-text"> Buddy is your friendly writing co-pilot, here to make your text writing experience a breeze. Whether you're crafting an essay, composing an email, or brainstorming ideas, our AI-powered buddy is here to help you find the perfect words and phrases effortlessly. </p>
                            {/* <p className="help-header-desc-text"> Buddy is an AI co-writer that interacts with you in two modes: Side by Side and Regular. Side by Side lets you type with Buddy restructuring and enhancing your text in real-time. Regular mode shows suggestions as you type, which you can accept by clicking or using the tab key. Both modes provide access to synonyms, and Regular mode adds tools for text formalization, enhancement, and AI content queries.</p> */}
                            
                            <h2 className="help-sub-header-text"> Getting Started </h2>
                            <div className="help-view-switch">
                                <p className="help-view-switch-text">{view ? "Side by Side" : "Regular"}</p>
                                <ViewSwitcher handleViewSwitch={handleViewSwitch} view={view} />
                            </div>
                            <ul className="help-list">
                                {view ? (
                                    <>
                                        <li className="help-list-item step1 " style={{marginTop: "20px"}}>
                                            <div className="help-step greenback">1</div>
                                            <div className="help-instruction">
                                                Use the title to tell Buddy what you're writing to give context and help guide its suggestions (Optionally).
                                            </div>
                                        </li>
                                        <li className="help-list-item step2 ">
                                            <div className="help-step paleback">2</div>
                                            <div className="help-instruction">
                                            Simply start typing whatever you want to write.
                                            </div>
                                        </li>
                                        <li className="help-list-item step3 ">
                                            <div className="help-step orangeback">3</div>
                                            <div className="help-instruction">
                                                Buddy monitors your input as you type. If no typing is detected, Buddy jumps in and provides an improved version of your text.
                                            </div>
                                        </li>
                                        <li className="help-list-item step4 ">
                                            <div className="help-step redback">4</div>
                                            <div className="help-instruction">
                                                Buddy generates tailored improvements and suggestions for you. You can accept these, refresh for new suggestions, or just continue typing to ignore.
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="help-list-item step1 " style={{marginTop: "20px"}}>
                                            <div className="help-step greenback">1</div>
                                            <div className="help-instruction">
                                                Use the title to tell Buddy what you're writing to give context and help guide its suggestions (Optionally).
                                            </div>
                                        </li>
                                        <li className="help-list-item step2 ">
                                            <div className="help-step paleback">2</div>
                                            <div className="help-instruction">
                                                Simply start typing whatever you want to write.
                                            </div>
                                        </li>
                                        <li className="help-list-item step3 ">
                                            <div className="help-step orangeback">3</div>
                                            <div className="help-instruction">
                                                Buddy monitors your input as you type. If no typing is detected, Buddy jumps in.
                                            </div>
                                        </li>
                                        <li className="help-list-item step4 ">
                                            <div className="help-step redback">4</div>
                                            <div className="help-instruction">
                                                Buddy tailors suggestions for you. Accept these by pressing Tab, clicking on it, or just continue typing to ignore.
                                            </div>
                                        </li>
                                    </>
                                )}
                            </ul>

                        </div>
                        <h2 className="help-sub-header-text-center"> Plus more features! </h2>
                        <div className="help-grid">
                            {/* <div className="help-grid-item"> <span className="help-grid-item-bold"> 🖌️ </span>  Choose from five different writing styles, ranging from formal to casual, using the slider provided. </div> */}
                            <div className="help-grid-item greenback">   Synonym, double click on any word and buddy will suggest synonyms for you (on mobile hold any word). </div> {/* <span className="help-grid-item-bold"> 📖 </span> */}
                            <div className="help-grid-item orangeback">  Instantly transform your writing in any way you can imagine by providing buddy a request. </div> {/* <span className="help-grid-item-bold"> 🖋️ </span> */}
                            <div className="help-grid-item redback">  Improve the overall quality of your text with grammar corrections, enhanced sentence structures, and much more. </div> {/* <span className="help-grid-item-bold"> ✨ </span>*/}
                            <div className="help-grid-item paleback">  Quickly get started on your work by having Buddy give you a head-start. </div> {/* <span className="help-grid-item-bold"> 📝 </span> */}
                        </div> 

                        <h2 className="help-sub-header-text-center small"> Enjoy using Buddy? Buy me a coffee <img src={VenmoIcon} alt="Venmo Icon" className="venmo-icon" onClick={() => window.open("https://account.venmo.com/u/buddyai", "_blank")} /> </h2>
                        {/* get venmo logo and link to https://account.venmo.com/u/buddyai */}
                    
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