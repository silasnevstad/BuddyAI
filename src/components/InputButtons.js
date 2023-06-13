import React, { useContext, useState, useEffect } from 'react';
import './styles/InputButtons.css';
import './styles/Buttons.css';
import Api from './Api';
import { AbortContext } from './AbortContext';

const InputButtons = ({ text, setResponseText, isLoading, setIsLoading, style, prompt, setHeadstartModalOpen, setSourceModalOpen }) => {
    const { modifyText, niceifyText } = Api();
    const { resetAbortController } = useContext(AbortContext);
    const [requestPrompt, setRequestPrompt] = useState('');

    const [placeholder, setPlaceholder] = useState("Sound more confident...");

    const handleNiceify = () => {
        if (isLoading || !text) return;
        resetAbortController();
        setIsLoading(true);
        niceifyText(text, style, prompt).then((data) => {
            setResponseText(data.response);
            setIsLoading(false);
        });
    };

    const handleModify = () => {
        if (isLoading || !text) return;
        resetAbortController();
        setIsLoading(true);
        modifyText(text, style, prompt, requestPrompt).then((data) => {
            setResponseText(data.response);
            setIsLoading(false);
        });
    };

    // every couple seconds change the placeholder text
    useEffect(() => {
        const placeholders = [
            "Make simpler...",
            "Make more formal...",
            "Sound more professional...",
            "Make more academic...",
            "Sound more confident...",
            "Make more persuasive...",
            "Make friendlier...",
            "Make more casual...",
            "Paraphrase...",
            "Add more detail...",
            "Remove unnecessary words...",
        ];

        const interval = setInterval(() => {
            //  make sure the new placeholder is different from the old one
            let newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
            while (newPlaceholder === placeholder) {
                newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
            }
            
            setPlaceholder(newPlaceholder);
        }, 4000);
        return () => clearInterval(interval);
    });

    return (
        <div className="input-buttons-container">
            {/* <div className="input-buttons-container-left"> */}
            <div className="input-buttons-container-left">
                <button className="input-button input-buttons-text" onClick={() => setHeadstartModalOpen(true)} disabled={isLoading}>Headstart</button>
                <button className="input-button input-buttons-text" onClick={handleNiceify} disabled={isLoading}>Improve</button>
                <button className="input-button input-buttons-text" onClick={() => setSourceModalOpen(true)} disabled={isLoading}>Sources</button>
            </div>
            <div class="input-field-with-button">
                <input type="text" placeholder={placeholder} disabled={isLoading} value={requestPrompt} onChange={(e) => setRequestPrompt(e.target.value)} />
                <button class="button-inside" onClick={handleModify} disabled={isLoading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </div>
        </div>
    );
}

export default InputButtons;
