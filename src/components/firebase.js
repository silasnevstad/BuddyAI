import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, deleteDoc,  doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

async function signUp(email, password, nickname) {
    if (!email || !password || !nickname) {
        return { success: false, error: 'missing-fields' };
    }
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Save the nickname to Firestore.
            const userDocRef = doc(db, `users/${userCredential.user.uid}`);
            await setDoc(userDocRef, { nickname: nickname, email: email });

            return { success: true, user: userCredential.user }
        })
        .catch((error) => {
            const errorCode = error.code;
            return { success: false, error: errorCode };
        });
}

async function signIn(email, password) {
    if (!email || !password) {
        return { success: false, error: 'missing-fields' };
    }
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return { success: true, user: userCredential.user }
        })
        .catch((error) => {
            const errorCode = error.code;
            return { success: false, error: errorCode };
        });
}

function signOut() {
    auth.signOut().then(() => {
    }).catch((error) => {
    });
}

async function getUserData(uid) {
    if (!uid) {
        return { success: false, error: 'missing-fields' };
    }
    const userDocRef = doc(db, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        return { success: false, error: 'user-not-found' };
    }
}

// A function for retrieving all a user's documents and returning them as a list.
async function getUserDocs(userId) {
    if (!userId) {
        return { success: false, error: 'missing-fields' };
    }
    const userDocsCollection = collection(db, `users/${userId}/docs`);
    const userDocSnapshot = await getDocs(userDocsCollection);
    const docs = userDocSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return docs;
}

// A function for updating a user's document when a user makes a change/update.
async function updateUserDoc(userId, docId, updatedContent) {
    if (!userId) {
        return { success: false, error: 'missing-fields' };
    }
    const userDocRef = doc(db, `users/${userId}/docs/${docId}`);
    return updateDoc(userDocRef, {
        title: updatedContent.title,
        content: updatedContent.content
    }).then(() => {
        return { success: true };
    }).catch((error) => {
        const errorCode = error.code;
        return { success: false, error: errorCode };
    });
}

async function deleteUserDoc(userId, docId) {
    if (!userId) {
        return null;
    }
    const userDocRef = doc(db, `users/${userId}/docs/${docId}`);
    return deleteDoc(userDocRef).then(() => {
        return { success: true };
    }).catch((error) => {
        const errorCode = error.code;
        return { success: false, error: errorCode };
    });
}

// A function to create a new blank document under a specific user.
async function createNewDoc(userId, initialContent = '') {
    if (!userId) {
        return null;
    }
    const userDocsCollection = collection(db, `users/${userId}/docs`);
    const docRef = await addDoc(userDocsCollection, {
        title: '',
        content: initialContent
    });
    // console.log("New document created with ID: ", docRef.id);
    return docRef.id;
}
// async function addNewDocument(userId, id) {
//     return await addDoc(collection(db, 'users', userId, 'documents'), {
//         id: id,
//         title: '',
//         content: '',
//     }).then((docRef) => {
//         return { success: true, docRef: docRef };
//     }).catch((error) => {
//         return { success: false, error: error };
//     });
// }

// async function getUserDocuments(userId) {
//     const userDocumentCollection = collection(db, 'users', userId, 'documents');
//     const snapshot = await getDocs(userDocumentCollection);
//     const documentList = [];

//     snapshot.forEach(doc => {
//         documentList.push({
//             id: doc.id,
//             ...doc.data()
//         });
//     });

//     return documentList;
// }


export { signUp, signIn, signOut, createNewDoc, getUserData, getUserDocs, updateUserDoc, deleteUserDoc, auth, onAuthStateChanged };