import React, { useState } from 'react';
import './styles/DocumentGrid.css'
import { Link } from 'react-router-dom';

const CreateDocumentButton = ({ handleClick }) => {
    return (
        <div className="document-item-container" onClick={handleClick}>
            <div className="create-document-item">
                <div className="create-document-icon">+</div>
                <div className="create-document-title">New Document</div>
            </div>
        </div>
    );
}

const DocumentItem = ({ document, index, setCurrentDocument, handleDeleteDocument, searchTerm }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const highlightSearchTerm = (text) => {
        if (!searchTerm) return text;
        let parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} className={part.toLowerCase() === searchTerm.toLowerCase() ? 'highlight' : ''}>
                { part }
            </span>)
        } </span>;
    };

    return (
        <div
            className="document-item-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {confirmDelete ? (
                <div className="document-item-center">
                    <div className="document-item-title">
                        Are you sure?
                    </div>
                    <div className="document-item-bottom">
                        <div className="document-item-bottom-content" onClick={() => handleDeleteDocument(index)} style={{cursor: "pointer"}}>
                            Yes
                        </div>
                        <div className="document-item-bottom-content" onClick={() => setConfirmDelete(false)} style={{cursor: "pointer"}}>
                            Cancel
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {isHovered && (
                        <div className="document-item-close-icon" onClick={() => setConfirmDelete(true)}>
                            <span style={{marginTop: '-5px'}}>&times;</span>
                        </div>
                    )}
                    <Link to={`/home`} className="document-item-link" onClick={() => setCurrentDocument(index)}>
                        <div className="document-item">
                            <div className="document-item-title">
                                {document.title ? highlightSearchTerm(document.title) : "Untitled"}
                            </div>
                            <div className="document-item-content">
                                {document.content ? highlightSearchTerm(document.content) : "No content"}
                            </div>
                        </div>
                    </Link>
                </>
            )}
            
        </div>
    );
};

const DocumentGrid = ({ searchTerm, documents, setDocuments, setCurrentDocument, addDocument, deleteDocument }) => {
    const handleNewDocument = async () => {
        const docId = await addDocument();

        const newDocument = {
            title: "",
            content: "",
            id: docId,
        }
        setDocuments([newDocument, ...documents]);
    }

    const handleDeleteDocument = (index) => {
        deleteDocument(documents[index].id);
        const newDocuments = [...documents];
        newDocuments.splice(index, 1);
        setDocuments(newDocuments);
    }

    const filteredDocuments = documents.filter((doc) => {
        return (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.content.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="document-grid-container">
            <div className="document-grid">
                {searchTerm === "" && (
                    <Link to="/home" className="document-item-link">
                        <CreateDocumentButton handleClick={handleNewDocument} />
                    </Link>
                )}
                {filteredDocuments.map((document, index) => {
                    return <DocumentItem key={document.id} document={document} index={index} setCurrentDocument={setCurrentDocument} handleDeleteDocument={handleDeleteDocument} searchTerm={searchTerm} />
                })}
            </div>
        </div>
    );
}

export default DocumentGrid;
