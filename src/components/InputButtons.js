import React, { useContext, useState } from 'react';
import './styles/InputButtons.css';
import './styles/Buttons.css';
import TextInputInfo from './TextInputInfo';
import Api from './Api';
import { AbortContext } from './AbortContext';

const InputButtons = ({ text, responseText, setText, setResponseText, isLoading, setIsLoading, style, prompt, setHeadstartModalOpen, setSourceModalOpen }) => {
    const { modifyText, formalizeText, niceifyText, askText } = Api();
    const { resetAbortController } = useContext(AbortContext);
    const [requestPrompt, setRequestPrompt] = useState('');

    const handleClear = () => {
        if (isLoading || !text) return;
        setText('');
    };

    const handleFormalize = () => {
        if (isLoading || !text) return;
        resetAbortController();
        setIsLoading(true);
        formalizeText(text, style, prompt).then((data) => {
            setResponseText(data.response);
            setIsLoading(false);
        });
    };

    const handleNiceify = () => {
        if (isLoading || !text) return;
        resetAbortController();
        setIsLoading(true);
        niceifyText(text, style, prompt).then((data) => {
            setResponseText(data.response);
            setIsLoading(false);
        });
    };

    const handleAsk = () => {
        if (isLoading || !text) return;
        resetAbortController();
        setIsLoading(true);
        askText(text, style).then((data) => {
            setResponseText(data);
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

    return (
        <div className="input-buttons-container">
            {/* <div className="input-buttons-container-left"> */}
            <div className="input-buttons-container-left">
                <button className="input-button input-buttons-text" onClick={() => setHeadstartModalOpen(true)} disabled={isLoading}>Headstart</button>
                <button className="input-button input-buttons-text" onClick={handleFormalize} disabled={isLoading}>Improve</button>
                <button className="input-button input-buttons-text" onClick={() => setSourceModalOpen(true)} disabled={isLoading}>Sources</button>
            </div>
            <div class="input-field-with-button">
                <input type="text" placeholder="Make simpler..." disabled={isLoading} value={requestPrompt} onChange={(e) => setRequestPrompt(e.target.value)} />
                <button class="button-inside" onClick={handleModify} disabled={isLoading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </div>
        </div>
    );
}

export default InputButtons;
