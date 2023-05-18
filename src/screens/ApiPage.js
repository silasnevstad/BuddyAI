import React from 'react';
import '../App.css';
import '../components/styles/ApiPage.css'
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import ApiEndpoint from '../components/ApiEndpoint';

const ApiPage = () => {
    const endpoints = [
        {
            endpoint: '/v1/buddy',
            description: 'Returns text completion suggestions based on the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a suggestion object.',
            example: '{text: \"The quick brown fox jumps over the \", prompt: \"\", style: 2}',
            response: '{suggestion:\'lazy dog\'}'
        },
        {
            endpoint: '/v1/formalize',
            description: 'Returns a more formal version of the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a response object with the formalized text.',
            example: '{text: \"string\", prompt: \"string\", style: 2}',
            response: '{response: \'string\' }'
        },
        {
            endpoint: '/v1/niceify',
            description: 'Returns a more refined version of the text provided.',
            inputDescription: 'Receives a JSON with text, prompt, and style. Prompt guides AI text generation direction and style defines its writing style (0-4). Both are optional.',
            outputDescription: 'Returns a response object with the refined text.',
            example: '{text: \"string\', prompt: \"string\", style: 2}',
            response: '{response: \'string\'}'
        },
        {
            endpoint: '/v1/auto',
            description: 'Automatically determines the best way to assist with the user\'s text.',
            inputDescription: 'Receives a JSON with text and style for input text and writing style of response. Style (0-4), while optional, defines the response\'s style.',
            outputDescription: 'Returns a response object with the generated text.',
            example: '{text: \'string\', style: 2}',
            response: '{response: \'string\'}'
        }
    ];

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
                    <p className="api-info"><span className="semibold green">Status</span> <span className="green">Online</span></p>
                        <p className="api-info"><span className="semibold green">Base URL</span> buddyai.herokuapp.com </p>
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
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default ApiPage;
