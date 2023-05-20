import React, { useState } from 'react';
import '../App.css';
import '../components/styles/SignUpPage.css';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { signUp } from '../components/firebase';

const InputFields = ({ nickname, setNickname, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <div className="input-fields">
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
    );
};

const SignUpButton = ({ isLoading, handleSignUp}) => {
    return (
        <button className="full-button" onClick={handleSignUp}>
            {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
    );
};       

function SignUpPage({ setUserId, setLoggedIn }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const firebaseCodeToMessage = (code) => {
        switch (code) {
            case 'auth/email-already-in-use':
                return 'Email already in use';
            case 'auth/invalid-email':
                return 'Invalid email';
            case 'auth/weak-password':
                return 'Password must be at least 6 characters';
            case 'auth/wrong-password':
                return 'Incorrect password';
            default:
                return 'Unknown error';
        }
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setIsError(true);
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        const response = await signUp(email, password, nickname);
        if (response.success) {
            window.location.href = '/';
            setUserId(response.user.uid);
            setLoggedIn(true);
        } else {
            setIsError(true);
            setError(firebaseCodeToMessage(response.error.code));
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
                        <InputFields nickname={nickname} setNickname={setNickname} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
                        <div className="signup-buttons">
                            <SignUpButton isLoading={isLoading} handleSignUp={handleSignUp} />
                            <button className="transparent-button" onClick={() => window.location.href = '/login'}>
                                Already have an account?
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

export default SignUpPage;
