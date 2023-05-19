import React, { useState, useEffect, useRef, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Api from './Api';
import './styles/TextInput.css';
import ArrowRight from './images/arrow-right.svg';
import X from './images/x.svg';
import { AbortContext } from './AbortContext';

const TextInput = ({ text, responseText, setText, setResponseText, style, prompt, isLoading }) => {
    const [input, setInput] = useState(text);
    const lastRequestRef = useRef('');
    const lastStyleRef = useRef('');
    const lastPromptRef = useRef('');
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [selectedWord, setSelectedWord] = useState('');
    const [synonyms, setSynonyms] = useState([]);
    const textareaRef = useRef(null);
    const placeholder = 'Type here...';
    const { aiComplete, synonym } = Api();
    const { abortController } = useContext(AbortContext);

    useEffect(() => {
        setInput(text);
    }, [text, setInput]);

    useEffect(() => {
        setText(input);
    }, [input, setText]);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && aiSuggestion) {
            e.preventDefault();
            const addedInput = input + aiSuggestion;
            setInput(addedInput);
            setAiSuggestion('');
        }
    };

    const handleDoubleClick = async (e) => {
        const text = e.target.value;
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const clickedWord = text.substring(start, end);
        setSelectedWord({word: clickedWord, start, end});
        const syns = await synonym(clickedWord);
        if (!syns) return;
        setSynonyms(syns.synonyms);
    };
    
    const replaceWithSynonym = (synonym) => {
        const beforeWord = input.substring(0, selectedWord.start);
        const afterWord = input.substring(selectedWord.end);
        setInput(beforeWord + synonym + afterWord);
        setSynonyms([]);
    };

    const handleReplaceWithResponse = () => {
        setInput(responseText);
        setResponseText('');
    };
    
    const handleChange = (e) => {
        setInput(e.target.value);
        setSynonyms([]);
    };

    const handleResponseChange = (e) => {
        setResponseText(e.target.value);
    };
    
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
      
        useEffect(() => {
          const handler = setTimeout(() => {
            setDebouncedValue(value);
          }, delay);
      
          return () => {
            clearTimeout(handler);
          };
        }, [value, delay]);
      
        return debouncedValue;
    };
    
    const debouncedInput = useDebounce(input, 750);

    useEffect(() => {
        if (!debouncedInput) {
            setAiSuggestion('');
            return;
        }
        if (debouncedInput === lastRequestRef.current && style === lastStyleRef.current && prompt === lastPromptRef.current) {
            return;
        }
        if (isLoading) {
            return;
        }
        lastRequestRef.current = debouncedInput;
        lastStyleRef.current = style;
        lastPromptRef.current = prompt;
    
        aiComplete(debouncedInput, style, prompt, abortController.signal).then(res => {
            if (res) {
                setAiSuggestion(res.suggestion);
            }
        });

    }, [debouncedInput, aiComplete, style, prompt]);

    return (
        <div className="text-input">
            <div className="input-container">
                <TextareaAutosize
                    ref={textareaRef}
                    className={`text-input__textarea ${responseText ? 'request-textarea' : ''}`} // Add class for request textarea
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    onDoubleClick={handleDoubleClick}
                    value={input}
                    placeholder={placeholder}
                    minRows={1}
                    maxRows={20}
                />
                {aiSuggestion && (
                    <div className="suggestion" onClick={() => {
                        const addedInput = input + aiSuggestion;
                        setInput(addedInput);
                        setAiSuggestion('');
                    }}>
                        {aiSuggestion}
                    </div>
                )}
                {synonyms.length > 0 && (
                    <div className="synonym-box">
                        {synonyms.map(syn => (
                            <div key={syn} onClick={() => replaceWithSynonym(syn)} className="synonym-text">{syn}</div>
                        ))}
                    </div>
                )}
            </div>
            {responseText && (
                <div className="input-container">
                    <button className="close-btn" onClick={() => setResponseText('')}><img src={X} alt="Close response" className="x-icon"/></button>
                    <button className="replace-btn" onClick={handleReplaceWithResponse}><img src={ArrowRight} alt="Replace with response" className="arrow-icon"/></button>
                    <TextareaAutosize
                        className="text-input__textarea request-textarea" // Add class for response textarea
                        value={responseText}
                        onChange={handleResponseChange}
                        placeholder="Formalized/Improved text will be displayed here..."
                        minRows={1}
                        maxRows={20}
                    />
                </div>
            )}
        </div>
    );
};

export default TextInput;
