import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './styles/HeadstartModal.css';
import Api from './Api';
import Loader from './Loader';

const HeadstartModal = ({ open, close, text, setText }) => {
    const placeholders = [
        'Essay about bitcoin',
        'Poem about the ocean',
        'Story about a dog',
        'Email in Tarantino style',
        'Letter to future self',
        'Tree\'s monologue',
        'Time machine user manual',
        'Argument between raindrops',
        'Mystery in a library',
        'Email to a teacher',
        'Martian\'s first speech on Earth',
        'AI\'s societal impacts essay',
        'Spring beauty song',
        'Letter to a character',
        'Quantum mechanics for kids',
        'Santa’s elf job application',
        'Advice for writer\'s block',
        'Cat and mouse dialogue',
        'Detective story in ancient Rome',
        'Script about a singing robot',
        'Restaurant review',
        'Letter to future you',
        'New fairytale creation',
        'Broccoli comedy routine',
        'Climate change & polar bears',
        'Sonnet about the moon',
        'Alien’s guide to humans',
        'Pet’s view of a famous figure',
        'Magical potion recipe',
        'Space exploration essay',
        'Intergalactic peace treaty',
        'News from a parallel universe',
        'Autobiography of a pencil',
        'Villain’s apology letter',
        'Trip to Earth\'s center',
    ];

    const [prompt, setPrompt] = useState('');
    const [headstart, setHeadstart] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isWaiting, setIsWaiting] = useState(false);
    const [loading, setLoading] = useState(false);
    const { askText } = Api();

    useEffect(() => {
        let timeout;
        if (isWaiting) {
            timeout = setTimeout(() => {
                setIsWaiting(false);
            }, 2500);
        } else {
            timeout = setTimeout(() => {
                if (isTyping) {
                    if (charIndex < placeholders[placeholderIndex].length) {
                        setPlaceholder(prev => prev + placeholders[placeholderIndex][charIndex]);
                        setCharIndex(prev => prev + 1);
                    } 
                    if (charIndex >= placeholders[placeholderIndex].length - 1) {
                        setIsWaiting(true);
                        setIsTyping(false);
                    }
                } else {
                    if (charIndex > 0) {
                        setPlaceholder(prev => prev.slice(0, -1));
                        setCharIndex(prev => prev - 1);
                    }
                    if (charIndex <= 1) {
                        setIsTyping(true);
                        setIsWaiting(false);
                        setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
                    }
                }
            }, isTyping ? 45 : 10); // Adjust typing/deletion speed here
        }

        return () => clearTimeout(timeout);
    }, [charIndex, placeholderIndex, placeholders, isTyping, isWaiting]);

    const handleAsk = async () => {
        setLoading(true);
        const response = await askText(prompt);
        setHeadstart(response);
        setLoading(false);
        console.log(response);
    }

    const handleConfirm = () => {
        setText(headstart);
        close();
    }

    const handleStartOver = () => {
        setText('');
        setHeadstart('');
        setPrompt('');
    }

    if (!open) return null;

    return (
        <div className="headstart-modal-container">
            <div className="headstart-modal">
                <div className="headstart-modal-content">
                    <div className="headstart-modal-content-text">
                        {loading ? (
                            <div className="headstart-modal-content-loading" style={{ marginTop: '1em' }}>
                                <Loader />
                            </div>
                        ) : (
                            headstart ? (
                                <div className="headstart-content-editor">
                                    <TextareaAutosize className="headstart-modal-content-textbox" placeholder={placeholder} rows="1" value={headstart} onChange={e => setHeadstart(e.target.value)} maxRows={10}></TextareaAutosize>
                                    <div className="headstart-content-editor-buttons">
                                        <button className="full-button close-btn" onClick={close}>Close</button>
                                        <button className="full-button green-btn" onClick={handleStartOver}>Start Over</button>
                                        <button className="full-button refresh-btn" onClick={handleAsk}>Refresh</button>
                                        <button className="full-button green-btn" onClick={handleConfirm}>Confirm</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <TextareaAutosize className="headstart-modal-content-textbox" placeholder={placeholder} rows="1" value={prompt} onChange={e => setPrompt(e.target.value)} maxRows={10}></TextareaAutosize>
                                    <div className="headstart-content-editor-buttons">
                                        <button className="full-button" onClick={handleAsk}>Ask</button>
                                        <button className="full-button" onClick={close}>Cancel</button>
                                    </div>
                                </>
                            )
                        )}                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeadstartModal;
