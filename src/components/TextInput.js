import React, { useState, useEffect, useRef, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Api from './Api';
import './styles/TextInput.css';
import ArrowRight from './images/arrow-right.svg';
import X from './images/x.svg';
import Refresh from './images/rotate-cw.svg';
import { AbortContext } from './AbortContext';

const TextInput = ({ text, responseText, setText, setResponseText, style, prompt, isLoading, setIsLoading }) => {
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

    const handleRefresh = () => {
        aiComplete(input, style, prompt, abortController.signal).then(res => {
            if (res) {
                setAiSuggestion(res.suggestion);
            }
        });
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
            <div className={`input-container ${responseText ? 'shrink' : ''}`}>
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
                        <div className="tab"> Tab </div>
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
                <div className="input-container slide-in">
                    <div className="input-header"> 
                        <p className="input-header__text">{}</p>
                        <div className="button-container">
                            <button className="flat-small-btn close-btn" onClick={() => setResponseText('')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <button className="flat-small-btn refresh-btn" onClick={handleRefresh} style={{right: '5em'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                            </button>
                            <button className="flat-small-btn use-btn" onClick={handleReplaceWithResponse} style={{right: '0em'}}> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>

                        </div>
                    </div>
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
