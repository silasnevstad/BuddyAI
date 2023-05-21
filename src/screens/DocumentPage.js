import React from 'react';
import '../App.css';
import '../components/styles/DocumentPage.css';
import DocumentGrid from '../components/DocumentGrid';
import Background from '../components/Background';
import Title from '../components/Title';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import { createNewDoc, deleteUserDoc } from '../components/firebase';

function DocumentPage({ userId, documents, setDocuments, setCurrentDocument }) {
    const addDocument = async () => {
        const docId = await createNewDoc(userId);
        console.log(docId);
        return docId;
    };

    const deleteDocument = async (docId) => {
        await deleteUserDoc(userId, docId);
    };

    return (
        <Background>
            <div className="App">
                <header className="App-header">
                    <Title loggedIn={userId !== ''} />
                    <HeaderNav currentPage={'/'} loggedIn={userId !== ''} />
                </header>
                <main className="App-main">
                    <DocumentGrid documents={documents} setDocuments={setDocuments} setCurrentDocument={setCurrentDocument} addDocument={addDocument} deleteDocument={deleteDocument} />
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </Background>
    );
}

export default DocumentPage;
