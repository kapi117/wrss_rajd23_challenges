import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    addDoc,
    collection,
    CollectionReference,
    DocumentData,
    onSnapshot,
    doc,
    setDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { faker } from "@faker-js/faker";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHcXoZeoSAobUDqoeWbIA-HHyPPU7G77s",
    authDomain: "wrss-weaiiib-rajd23.firebaseapp.com",
    projectId: "wrss-weaiiib-rajd23",
    storageBucket: "wrss-weaiiib-rajd23.appspot.com",
    messagingSenderId: "952667535656",
    appId: "1:952667535656:web:ef27f71fc470dc849eb81d",
    measurementId: "G-C09CCTPP9E",
    // rewrite above in typescript
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

console.log(app);

function App() {
    let teamsRef: CollectionReference<DocumentData> = collection(db, "teams");
    let metaRef: CollectionReference<DocumentData> = collection(db, "metadata");
    let unsubscribe = onSnapshot(teamsRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);
        });
    });

    auth.onAuthStateChanged((user) => {
        if (user) {
            const mail: string = user.email!;
            // that's how you get user's email
            console.log(mail);
        } else {
            console.log("no user");
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => signInWithPopup(auth, provider)}>
                    Log in
                </button>
                <button onClick={() => auth.signOut()}>Log out</button>
            </header>
            <section className="App-body">
                <p>body</p>
                <ul>
                    <li>1</li>
                </ul>

                <button onClick={() => {}}>add</button>
            </section>
        </div>
    );
}

export default App;
