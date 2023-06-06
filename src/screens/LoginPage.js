import React, { useState } from 'react';
import '../App.css';
import '../components/styles/SignUpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { signIn } from '../components/firebase';

const InputField = ({ id, value, onChange, placeholder, password }) => {
    const isEmpty = !value;
    
    return (
        <div className="input-field-container">
            <input
                type={password ? 'password' : 'text'}
                id={id}
                placeholder=""
                value={value}
                onChange={onChange}
                className={isEmpty ? '' : 'non-empty'}
            />
            <label htmlFor={id}>{placeholder}</label>
        </div>
    );
};

const InputFields = ({ email, setEmail, password, setPassword }) => {
    return (
        <div className="input-fields">
            <InputField id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {/* make password field secure (hide characters) */}
            <InputField id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" password={true} />
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

    const firebaseAuthErrorCodes = {
        'auth/invalid-email': 'Invalid email address.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password.',
    }

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
                        {isError ? <p className="error-message">{firebaseAuthErrorCodes[error]}</p> : null}
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
