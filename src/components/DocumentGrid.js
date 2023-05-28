import React from 'react';
import './styles/DocumentGrid.css'
import { Link } from 'react-router-dom';

const CreateDocumentButton = ({ handleClick }) => {
    return (
        <div className="document-item-container" onClick={handleClick}>
            <div className="create-document-item">
                <div className="create-document-icon green">+</div>
                <div className="create-document-title">New Document</div>
            </div>
        </div>
    );
}

const DocumentItem = ({ document, index, handleDeleteDocument, searchTerm, editing }) => {
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
            className={`document-item-container ${editing ? "document-item-container-editing" : ""}`}
        >
            {editing && <button className="document-item-delete" onClick={() => handleDeleteDocument(index)}>x</button>}
            <div className="document-item-inner">
                <Link to={`/docs/${document.id}`} className="document-item-link">
                    <div className="document-item">
                        <div className="document-item-title">
                            {document.title ? highlightSearchTerm(document.title) : "Untitled"}
                        </div>
                        <div className="document-item-content">
                            {document.content ? highlightSearchTerm(document.content) : "No content"}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

const DocumentGrid = ({ searchTerm, documents, setDocuments, addDocument, deleteDocument, editing }) => {
    const handleNewDocument = async () => {
        const docId = await addDocument();

        const newDocument = {
            title: "",
            content: "",
            id: docId,
        }
        setDocuments([newDocument, ...documents]);

        // send user to new document
        window.location.href = `/docs/${docId}`;
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
                    <Link className='document-item-link'>
                        <CreateDocumentButton handleClick={handleNewDocument} />
                    </Link>
                )}
                {filteredDocuments.map((document, index) => {
                    return <DocumentItem key={document.id} document={document} index={index} handleDeleteDocument={handleDeleteDocument} searchTerm={searchTerm} editing={editing} />
                })}
            </div>
        </div>
    );
}

export default DocumentGrid;
