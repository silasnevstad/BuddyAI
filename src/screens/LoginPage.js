import React, { useState } from 'react';
import '../App.css';
import '../components/styles/SignUpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { signIn } from '../components/firebase';

const InputFields = ({ email, setEmail, password, setPassword }) => {
    return (
        <div className="input-fields">
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
};

const LoginButton = ({ isLoading, handleSignIn }) => {
    return (
        <button className="full-button" onClick={handleSignIn}>
            {isLoading ? 'Loading...' : 'Login'}
        </button>
    );
};       

function LoginPage({ setUserId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        setIsLoading(true);
        const response = await signIn(email, password);
        if (response.error) {
            setIsError(true);
            setError(response.error);
        } else {
            window.location.href = '/';
            setUserId(response.user.uid);
        }
        setIsLoading(false);
    };

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title />
                    <HeaderNav currentPage={'/signup'} />
                </header>
                <main className="App-main">
                    <div className="signup-container">
                        {isError ? <p className="error-message">{error}</p> : null }
                        <InputFields email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                        <div className="signup-buttons">
                            <LoginButton isLoading={isLoading} handleSignIn={handleSignIn} />
                            <button className="transparent-button login-btn" onClick={() => window.location.href = '/signup'}>
                                Don't have an account?
                            </button>
                        </div>
                    </div>
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default LoginPage;
