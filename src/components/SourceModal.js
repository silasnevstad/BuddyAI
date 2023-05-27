import './styles/SourceModal.css'
import React, { useState, useEffect } from 'react';
import { updateUserDoc } from '../components/firebase';

const SourceModal = ({ open, close, sources, addSource, deleteSource }) => {
    const [addingSource, setAddingSource] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const shortenText = (text) => {
        if (text.length > 60) {
            return text.substring(0, 60).trim() + '...';
        }
        return text;
    }

    const handleClose = () => {
        setTitle('');
        setText('');
        setAddingSource(false);
        close();
    }

    const handleAddSource = () => {
        const newSource = {
            title: title,
            text: text
        }
        addSource(newSource);
        setTitle('');
        setText('');
        setAddingSource(false);
    }

    const handleDeleteSource = (source) => {
        deleteSource(source);
    }
    

    if (!open) return null;
    return (
        <div className="modal-container">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <p className="modal-header-text">{addingSource ? "New Source" : "Sources"}</p>
                    <div className="modal-header-buttons">
                        {addingSource && window.innerWidth > 780 && <span className="full-button" onClick={() => setAddingSource(false)}>Back</span>}
                        {!addingSource && sources.length > 0 && <span onClick={() => setIsEditing(!isEditing)} className="full-button">{isEditing ? "Done" : "Edit"}</span>}
                        {addingSource ?
                            <span onClick={handleAddSource} className="full-button">Add Source</span> :
                            <span onClick={() => setAddingSource(true)} className="full-button">New Source</span>
                        }
                        <span onClick={handleClose} className="full-button">Close</span>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        {addingSource ? 
                            <div className="new-source-container">
                                <input className="new-source-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <textarea className="new-source" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} />
                            </div>
                        :
                        sources.length > 0 ?
                            <div className="source-grid">
                                {sources.map((source, index) => (
                                    <div key={index} className={`source-grid-item ${isEditing ? "source-grid-item-editing" : ""}`}>
                                        {isEditing && <button className="delete-button" onClick={() => handleDeleteSource(source)}>X</button>}
                                        <p className="source-grid-item-title">{source.title}</p>
                                        <p className="source-grid-item-text">{shortenText(source.text)}</p>
                                    </div>                                
                                ))}
                            </div>
                        :
                           <p className="no-sources-text">Nothing here yet.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SourceModal;