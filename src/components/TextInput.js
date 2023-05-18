import React, { useState, useEffect, useRef, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Api from './Api';
import './styles/TextInput.css';
// import { AbortContext } from './AbortContext';

const TextInput = ({ text, setText, style, prompt, isLoading }) => {
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
    

    const handleChange = (e) => {
        setInput(e.target.value);
        setSynonyms([]);
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
    
        aiComplete(debouncedInput, style, prompt).then(res => {
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
                    className="text-input__textarea"
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
        </div>
    );
};

export default TextInput;
