import React, { useState } from 'react';
import '../App.css';
import '../components/styles/DocumentPage.css';
import Welcome from '../components/Welcome';
import DocumentGrid from '../components/DocumentGrid';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { createNewDoc, deleteUserDoc } from '../components/firebase';

function DocumentPage({ userId, documents, setDocuments }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [editing, setEditing] = useState(false);

    const addDocument = async () => {
        const docId = await createNewDoc(userId);
        return docId;
    };

    const deleteDocument = async (docId) => {
        await deleteUserDoc(userId, docId);
    };

    const onSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title loggedIn={userId !== ''} />
                    <HeaderNav currentPage={'/'} loggedIn={userId !== ''} />
                </header>
                <main className="App-main">
                    <Welcome userId={userId} onSearch={onSearch} editing={editing} setEditing={setEditing} />
                    <DocumentGrid searchTerm={searchTerm} documents={documents} setDocuments={setDocuments} addDocument={addDocument} deleteDocument={deleteDocument} editing={editing} />
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default DocumentPage;
