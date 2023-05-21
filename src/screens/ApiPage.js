import React, { useState, useEffect } from 'react';
import '../App.css';
import '../components/styles/ApiPage.css'
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import ApiEndpoint from '../components/ApiEndpoint';
import Api from '../components/Api';
import LockIcon from '../components/images/lock.svg';
import { addApiKey, getApiKey } from '../components/firebase';

const ApiPage = ({ userId }) => {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(true);
    const [showPythonCode, setShowPythonCode] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');
    const { createAPIKey } = Api();
    const endpoints = [
        {
            endpoint: '/v1/buddy',
            description: 'Returns text completion suggestions based on the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a suggestion object.',
            example: '{text: "The quick brown fox jumps over the ", prompt: "", style: 2}',
            response: '{suggestion:\'lazy dog\'}'
        },
        {
            endpoint: '/v1/formalize',
            description: 'Returns a more formal version of the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a response object with the formalized text.',
            example: '{text: "string", prompt: "string", style: 2}',
            response: '{response: \'string\' }'
        },
        {
            endpoint: '/v1/improve',
            description: 'Returns a more refined version of the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a response object with the refined text.',
            example: '{text: "string", prompt: "string", style: 2}',
            response: '{response: \'string\'}'
        },
        {
            endpoint: '/v1/synonym',
            description: 'Returns synonyms of the word provided.',
            inputDescription: 'Receives a JSON with a word key.',
            outputDescription: 'Returns a response object with the generated text.',
            example: '{word: \'string\'}',
            response: '{synonyms: \'string\'}'
        },
        {
            endpoint: '/v1/ask',
            description: 'Ask buddy a question and receive a response',
            inputDescription: 'Receives a JSON with text and style for input text and writing style of response. Style (0-4), while optional, defines the response\'s style.',
            outputDescription: 'Returns a response object with the generated text.',
            example: '{text: \'string\', style: 2}',
            response: '{response: \'string\'}'
        }
    ];

    //  check if user has api key when page loads (only if logged in)
    useEffect(() => {
        if (userId !== '') {
            getApiKey(userId).then((key) => {
                if (key !== '') {
                    setApiKey(key);
                }
            });
        }
    }, [userId]);

    const handleCreateAPIKey = async () => {
        if (apiKey !== '') {
            return;
        }
        if (userId === '') {
            window.location.href = '/signup';
            return;
        }
        const createResponse = await createAPIKey();
        setApiKey(createResponse.api_key);
        addApiKey(userId, createResponse.api_key);
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopyStatus('Copied!');
    }
    
    useEffect(() => {
        if (copyStatus === 'Copied!') {
            const timer = setTimeout(() => {
                setCopyStatus('');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [copyStatus]);

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title loggedIn={userId !== ''} />
                    <HeaderNav currentPage={'/api'} loggedIn={userId !== ''} />
                </header>
                <main className="App-main">
                    <h1 className="api-title">API</h1>
                    <p className="api-description">The Buddy API provides text completion suggestions and text refinements. The API is currently in <span className="semibold green">beta</span> and is subject to change.</p>
                    <div className="api-info-container">
                        <p className="api-info" onClick={() => setShowKey(!showKey)}><span className="semibold green">Status:</span> <span className="semibold green">Online</span></p>
                        <p className="api-info"><span className="semibold green">Base URL</span> apibuddy.herokuapp.com </p>
                        {apiKey ? 
                            <p className="api-info" onClick={handleCopyToClipboard} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span className="semibold green">API Key</span> 
                                {showKey ? apiKey : '•'.repeat(apiKey.length)} 
                                {!copyStatus && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>}
                                {copyStatus && <p className="copy-status">{copyStatus}</p>}
                            </p>
                            : (
                                <button className="api-info-button" onClick={handleCreateAPIKey}>Authorize <img src={LockIcon} alt="lock icon" className="lock-icon" /></button>
                            )
                        }
                    </div>

                    <div className="api-endpoints-container">
                        {endpoints.map((endpoint, index) => (
                            <ApiEndpoint 
                                key={index}
                                endpoint={endpoint.endpoint} 
                                description={endpoint.description} 
                                inputDescription={endpoint.inputDescription} 
                                outputDescription={endpoint.outputDescription}
                                example={endpoint.example} 
                                response={endpoint.response}
                            />
                        ))}
                    </div>

                    <button className="api-sub-title-btn" onClick={() => setShowPythonCode(!showPythonCode)}>{showPythonCode ? 'Hide' : 'Show'} Python Example</button>
                    {showPythonCode && 
                        <div className="api-endpoint-code-container-python">
                            <p className="api-endpoint-code">{'import requests'}</p>
                            <p className="api-endpoint-code">{''}</p>
                            <p className="api-endpoint-code">{'class BuddyAPI:'}</p>
                            <p className="api-endpoint-code indent">{'def __init__(self, api_key):'}</p>
                            <p className="api-endpoint-code double-indent">{'self.api_key = api_key'}</p>
                            <p className="api-endpoint-code double-indent">{'self.base_url = \'https://buddyai.herokuapp.com/v1\''}</p>
                            <p className="api-endpoint-code">{''}</p>
                            <p className="api-endpoint-code indent">{'def text_suggest(self, text):'}</p>
                            <p className="api-endpoint-code double-indent">{'url = f\'{self.base_url}/buddy\''}</p>
                            <p className="api-endpoint-code double-indent">{'headers = {'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'Content-Type\': \'application/json\''}</p>
                            <p className="api-endpoint-code triple-indent">{'\'Authorization\':  f\'Bearer {self.api_key}\','}</p>
                            <p className="api-endpoint-code double-indent">{'}'}</p>
                            <p className="api-endpoint-code double-indent">{'data = {'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'text\': text'}</p>
                            <p className="api-endpoint-code double-indent">{'}'}</p>
                            <p className="api-endpoint-code double-indent">{'response = requests.post(url, headers=headers, json=data)'}</p>
                            <p className="api-endpoint-code double-indent">{'return response.json()'}</p>
                            <p className="api-endpoint-code">{''}</p>
                            <p className="api-endpoint-code indent">{'def formalize_text(self, text, prompt, style):'}</p>
                            <p className="api-endpoint-code double-indent">{'url = f\'{self.base_url}/formalize\''}</p>
                            <p className="api-endpoint-code double-indent">{'headers = {'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'Content-Type\': \'application/json\''}</p>
                            <p className="api-endpoint-code triple-indent">{'\'Authorization\':  f\'Bearer {self.api_key}\','}</p>
                            <p className="api-endpoint-code double-indent">{'}'}</p>
                            <p className="api-endpoint-code double-indent">{'data = {'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'text\': text'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'style\': style'}</p>
                            <p className="api-endpoint-code triple-indent">{'\'prompt\': prompt'}</p>
                            <p className="api-endpoint-code double-indent">{'}'}</p>
                            <p className="api-endpoint-code double-indent">{'response = requests.post(url, headers=headers, json=data)'}</p>
                            <p className="api-endpoint-code double-indent">{'return response.json()'}</p>
                        </div>
                    }
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default ApiPage;
