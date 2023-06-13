import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './styles/HeadstartModal.css';
import Api from './Api';
import Loader from './Loader';

const HeadstartModal = ({ open, close, setText }) => {
    const [prompt, setPrompt] = useState('');
    const [headstart, setHeadstart] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [delayTyping, setDelayTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const { askText } = Api();
    const textareaRef = useRef(null);

    useEffect(() => {
        if (headstart !== '') {
            // If the user has already typed something, don't overwrite it
            return;
        }
        const placeholderTexts = [
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

        const updatePrompt = () => {
            if (!textareaRef.current || !textareaRef.current.matches(':focus')) {
                if (isTyping && !delayTyping) {
                    if (charIndex < placeholderTexts[placeholderIndex].length) {
                        setPlaceholder(prev => prev + placeholderTexts[placeholderIndex][charIndex]);
                        setCharIndex(prev => prev + 1);
                    } else {
                        setIsTyping(false);
                        setDelayTyping(true);
                        setTimeout(() => {
                            setDelayTyping(false);
                        }, 2000);
                    }
                } else if (!delayTyping) {
                    if (charIndex > 0) {
                        setPlaceholder(prev => prev.slice(0, -1));
                        setCharIndex(prev => prev - 1);
                    } else {
                        setIsTyping(true);
                        setDelayTyping(true);
                        setTimeout(() => {
                            setDelayTyping(false);
                            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
                        }, 2000);
                    }
                }
            }
        };
        

        const typingInterval = setInterval(updatePrompt, isTyping ? 55 : 10);


        return () => {
            clearInterval(typingInterval);
        };
    }, [charIndex, placeholderIndex, isTyping, delayTyping]);

    useEffect(() => {
        // If the user is typing, don't overwrite it
        if (textareaRef.current && textareaRef.current.matches(':focus')) { 
            setPrompt('');
        }
    }, [textareaRef]);

    const handleAsk = async () => {
        setLoading(true);
        const response = await askText(prompt);
        setHeadstart(response);
        setLoading(false);
    };

    const handleConfirm = () => {
        setText(headstart);
        setHeadstart('');
        setPrompt('');
        close();
    };

    const handleStartOver = () => {
        setText('');
        setHeadstart('');
        setPrompt('');
    };


    const onClose = () => {
        setPrompt('');
        setHeadstart('');
        close();
    };

    if (!open) return null;

    return (
        <div className="headstart-modal-container">
            <div className="headstart-modal">
                <div className="headstart-modal-content">
                    <div className="headstart-modal-content-text">
                        {loading ? (
                        <div className="headstart-modal-content-loading" style={{ marginTop: '4em' }}>
                            <Loader />
                        </div>
                        ) : headstart ? (
                        <div className="headstart-content-editor">
                            <TextareaAutosize
                            className="headstart-modal-content-textbox"
                            rows="1"
                            value={headstart}
                            onChange={(e) => setHeadstart(e.target.value)}
                            maxRows={35}
                            ></TextareaAutosize>
                            <div className="headstart-content-editor-buttons">
                                <button className="blue-btn close-btn redhover" onClick={onClose}>
                                    Close
                                </button>
                                <button className="blue-btn green-btn" onClick={handleStartOver}>
                                    Start Over
                                </button>
                                <button className="blue-btn refresh-btn orangehover" onClick={handleAsk}>
                                    Refresh
                                </button>
                                <button className="blue-btn green-btn" onClick={handleConfirm}>
                                    Use
                                </button>
                            </div>
                        </div>
                        ) : (
                        <>
                            <TextareaAutosize
                            className="headstart-modal-content-textbox"
                            rows="1"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onFocus={() => setPrompt('')}
                            placeholder={placeholder}
                            ref={textareaRef}
                            maxRows={10}
                            ></TextareaAutosize>
                            <div className="headstart-content-editor-buttons">
                                <button className="blue-btn redhover" onClick={onClose}>
                                    Cancel
                                </button>
                                <button className="blue-btn" onClick={handleAsk}>
                                    Go
                                </button>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadstartModal;
