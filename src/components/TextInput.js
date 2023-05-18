import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Api from './Api';
import './styles/TextInput.css';

const TextInput = ({ text, setText, style }) => {
    const [input, setInput] = useState(text);
    const [rows, setRows] = useState(1);
    const [lineWidth, setLineWidth] = useState(1);
    const lastRequestRef = useRef('');
    const lastStyleRef = useRef('');
    const [aiSuggestion, setAiSuggestion] = useState('');
    const textareaRef = useRef(null);
    const placeholder = 'Type here...';
    const { aiComplete } = Api();

    useEffect(() => {
        setInput(text);
    }, [text, setInput]);

    useEffect(() => {
        setText(input);
    }, [input, setText]);

    useEffect(() => {
        const textareaWidth = textareaRef.current.offsetWidth;
        const characterWidth = textareaRef.current.scrollWidth / input.length;
        setLineWidth(Math.floor(textareaWidth / characterWidth));
    }, [input]);

    useEffect(() => {
        const newlineCount = input.split('\n').length;
        const wrapCount = Math.ceil(input.length / lineWidth);
        setRows(Math.max(newlineCount, wrapCount));
    }, [input, lineWidth]);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && aiSuggestion) {
            e.preventDefault();
            const addedInput = input + aiSuggestion;
            setInput(addedInput);
            setAiSuggestion('');
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
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
        if (debouncedInput === lastRequestRef.current) {
            return;
        }
        if (style === lastStyleRef.current) {
            return;
        }
        lastRequestRef.current = debouncedInput;
        lastStyleRef.current = style;
    
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        aiComplete(debouncedInput, style, signal).then(res => {
            if (res) {
                setAiSuggestion(res.suggestion);
            }
        });
    
        // cancel the previous request before making a new request
        return () => {
            abortController.abort();
        }
    }, [debouncedInput, aiComplete, style]);
    

    useEffect(() => {
        setRows(input.split('\n').length);
    }, [input]);

    return (
        <div className="text-input">
            <div className="input-container">
                <TextareaAutosize
                    ref={textareaRef}
                    className="text-input__textarea"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
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
            </div>
        </div>
    );
};

export default TextInput;
