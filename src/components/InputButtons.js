import React, { useContext } from 'react';
import './styles/InputButtons.css';
import './styles/Buttons.css';
import TextInputInfo from './TextInputInfo';
import Api from './Api';
import { AbortContext } from './AbortContext';

const InputButtons = ({ text, responseText, setText, setResponseText, isLoading, setIsLoading, style, prompt }) => {
    const { formalizeText, niceifyText, askText } = Api();
    const { resetAbortController } = useContext(AbortContext);

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

    return (
        <div className="input-buttons-container">
            <div className="input-buttons-container-left">
                <button className="transparent-button" onClick={handleClear} disabled={isLoading}>Clear</button>
                <button className="transparent-button" onClick={handleFormalize} disabled={isLoading}>Formalize</button>
                <button className="transparent-button" onClick={handleNiceify} disabled={isLoading}>Improve</button>
                <button className="transparent-button" onClick={handleAsk} disabled={isLoading}>Ask Buddy</button>
                {/* show a synoym button if its on mobile */}
                {/* {window.innerWidth <= 768 && <button className="transparent-button" onClick={() => { }} disabled={isLoading}>Synonym</button>} */}
            </div>

            <div className="input-buttons-container-right">
                <TextInputInfo text={text} />
            </div>
        </div>
    );
}

export default InputButtons;
