import React, { useState, useEffect, useRef, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Api from './Api';
import './styles/TextInput.css';
import { AbortContext } from './AbortContext';

const SideTextInput = ({ text, responseText, setText, setResponseText, prompt, isLoading, setIsLoading, signal, sources }) => {
    const [input, setInput] = useState(text);
    const lastRequestRef = useRef('');
    const lastPromptRef = useRef('');
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [selectedWord, setSelectedWord] = useState('');
    const [synonyms, setSynonyms] = useState([]);
    const textareaRef = useRef(null);
    const placeholder = 'Type here...';
    const { aiComplete2, synonym } = Api();

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
        setIsLoading(true);
        aiComplete2(debouncedInput, sources, prompt, signal).then((res) => {
            if (res) {
                setAiSuggestion(res.text);
            }
        }).finally(() => {
            setIsLoading(false);
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
        if (debouncedInput === lastRequestRef.current && prompt === lastPromptRef.current) {
            return;
        }
        if (isLoading) {
            return;
        }
        lastRequestRef.current = debouncedInput;
        lastPromptRef.current = prompt;
    
        setIsLoading(true);
        aiComplete2(debouncedInput, sources, prompt, signal).then((res) => {
            if (res) {
                setResponseText(res.text);
            }
        }).finally(() => {
            setIsLoading(false);
        });

    }, [debouncedInput, aiComplete2, sources, prompt, setIsLoading, responseText, setResponseText, isLoading]);

    return (
        <div className="text-input">
            <div className="input-container">
                <div className="input-header"> 
                    <p className="input-header__text">You</p>
                </div>
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
                {synonyms.length > 0 && (
                    <div className="synonym-box">
                        {synonyms.map(syn => (
                            <div key={syn} onClick={() => replaceWithSynonym(syn)} className="synonym-text">{syn}</div>
                        ))}
                    </div>
                )}
            </div>
            {/* <div className="button-container">
                <button className="flat-small-btn refresh-btn" onClick={handleRefresh} style={{right: '5em'}}><img src={Refresh} alt="Refresh response" className="refresh-icon"/></button>
                <button className="flat-small-btn green-btn" onClick={handleReplaceWithResponse} style={{right: '0em'}}>Use <img src={ArrowRight} alt="Replace with response" className="arrow-icon"/></button>
            </div> */}

            <div className="input-container">
                {/* <button className="close-btn" onClick={() => setResponseText('')}><img src={X} alt="Close response" className="x-icon"/></button> */}
                <div className="input-header"> 
                    <p className="input-header__text">{isLoading ? 'Thinking' : 'Buddy'}</p>
                    <div className="button-container">
                        <button className="flat-small-btn refresh-btn" onClick={handleRefresh} style={{right: '5em'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        </button>
                        <button className="flat-small-btn green-btn" onClick={handleReplaceWithResponse} style={{right: '0em'}}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>

                    </div>
                </div>
                <TextareaAutosize
                    className="text-input__textarea request-textarea"
                    value={responseText}
                    onChange={handleResponseChange}
                    placeholder="Buddy will type here..."
                    minRows={1}
                    maxRows={20}
                />
            </div>
        </div>
    );
};

export default SideTextInput;
