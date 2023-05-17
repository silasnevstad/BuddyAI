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
            inputDescription: 'Takes in a JSON with text and style keys for the input text and style of suggestions.',
            outputDescription: 'Returns a suggestion object.',
            example: '{text: \"The quick brown fox jumps over the \", style: 2}',
            response: '{suggestion:\'lazy dog\'}'
        },
        {
            endpoint: '/v1/formalize',
            description: 'Returns a more formal version of the text provided.',
            inputDescription: 'Takes in a JSON with text and style keys for the input text and style of formalization.',
            outputDescription: 'Returns a response object with the formalized text.',
            example: '{text: \"Hey! whats up \", style: 2}',
            response: '{response: \'Hello, how are you?\' }'
        },
        {
            endpoint: '/v1/niceify',
            description: 'Returns a more refined version of the text provided.',
            inputDescription: 'Takes in a JSON with text and style keys for the input text and style of refinement.',
            outputDescription: 'Returns a response object with the refined text.',
            example: '{text: \"Hey Prof, sorry I missed \', style: 2}',
            response: '{response: \'Dear Professor, I sincerely apologize for my absence.\'}'
        },
        {
            endpoint: '/v1/auto',
            description: 'Automatically determines the best way to assist with the user\'s text.',
            inputDescription: 'Takes in a JSON with text and style keys for the input text and style of the desired response.',
            outputDescription: 'Returns a response object with the generated text.',
            example: '{text: \'Write 100 words in the style of Tarantino\', style: 2}',
            response: '{response: \'The diner was empty, except for me and the old man sitting...\'}'
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
