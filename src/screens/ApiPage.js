import React, { useState } from 'react';
import '../App.css';
import '../components/styles/ApiPage.css'
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import ApiEndpoint from '../components/ApiEndpoint';
import Api from '../components/Api';
import LockIcon from '../components/images/lock.svg';

const ApiPage = () => {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(true);
    const [showPythonCode, setShowPythonCode] = useState(true);
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
            endpoint: '/v1/niceify',
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

    const handleCreateAPIKey = async () => {
        const response = await createAPIKey();
        setApiKey(response.api_key);
    }

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title />
                    <HeaderNav currentPage={'/api'} />
                </header>
                <main className="App-main">
                    <h1 className="api-title">API</h1>
                    <p className="api-description">The Buddy API provides text completion suggestions and text refinements. The API is currently in <span className="green">beta</span> and is subject to change.</p>
                    <div className="api-info-container">
                        <p className="api-info" onClick={() => setShowKey(!showKey)}><span className="semibold green">Status</span> <span className="green">Online</span></p>
                        <p className="api-info"><span className="semibold green">Base URL</span> buddyai.herokuapp.com </p>
                        {apiKey ? <p className="api-info"><span className="semibold green">API Key</span> {showKey ? apiKey : '•'.repeat(apiKey.length)}</p> 
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
