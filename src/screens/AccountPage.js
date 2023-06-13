import React, { useState, useEffect } from 'react';
import '../App.css';
import '../components/styles/AccountPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { getUserData, signOut } from '../components/firebase';
// import BuddyLogo from '../components/images/buddyLogo.png';

function AccountPage({ userId, loggedIn }) {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState('English');

    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const userData = await getUserData(userId);
                if (userData) {
                    setUserData(userData);
                }
            } else {
                // console.log('No user ID');
            }
            setIsLoading(false);
        };
        fetchData();
    }, [userId]);
    

    const handleSignOut = async () => {
        signOut();
        window.location.href = '/';
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title loggedIn={loggedIn} hideMobile={true} />
                    <HeaderNav currentPage={'/'} loggedIn={loggedIn} />
                </header>
                <main className="App-main">
                    <div className="account-page">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="account-page-content">
                                <div className="account-page-section">
                                    <div className="account-page-header">
                                        <div className="account-page-header-right">
                                            <p className="header-nickname">Hey {userData.nickname},</p>
                                            <p className="header-email">{userData.email}</p>
                                        </div>
                                    </div>

                                    <p className="account-page-subheader">Profile</p>
                                    <p className="profile-details">Name</p>
                                    <p className="profile-text">{userData.nickname}</p>
                                    <p className="profile-details">Email</p>
                                    <p className="profile-text">{userData.email}</p>
                                    <p className="profile-details">Password</p>
                                    {/* a bunch of bullet points for the password */}
                                    <p className="profile-text">•••••••••</p>

                                    <button className="full-button" onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                                <div className="account-page-section">
                                    {window.innerWidth > 600 && <div className="account-page-header"></div>}


                                    <p className="account-page-subheader">Preferences</p>
                                    <p className="profile-details">Language</p>
                                    <select className="select-language" value={language} onChange={handleLanguageChange}>
                                        {languages.map((lang) => (
                                            <option key={lang} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default AccountPage;
