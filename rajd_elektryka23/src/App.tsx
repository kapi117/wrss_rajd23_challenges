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
import { Nav, Navbar, Table } from "react-bootstrap";
import firebaseConfig from "./config/firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

console.log(app);

function App() {
    const challenges = [
        { name: "Challenge 1", points: 100 },
        { name: "Challenge 2", points: 200 },
        { name: "Challenge 3", points: 300 },
    ];

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
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 text-center">
                        <h1 className="font-xmas text-dark my-3">
                            Ho Ho Ho! 🎅 <br /> Gotowi na bojowe zadania?
                        </h1>
                    </div>
                </div>

                <div className="container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Challenge</th>
                                <th>Punkty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.map((challenge, index) => (
                                <tr
                                    className={
                                        index % 2 === 0
                                            ? "table-light"
                                            : "table-secondary"
                                    }
                                >
                                    <td>{challenge.name}</td>
                                    <td>{challenge.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Navbar bg="dark" variant="dark" fixed="bottom">
                    <Nav className="justify-content-between container-fluid d-flex">
                        <Nav.Link
                            href="/"
                            className="d-flex justify-content-center w-50"
                        >
                            <i className="bi bi-house-fill"> Zadania</i>
                        </Nav.Link>
                        <Nav.Link
                            href="/admin"
                            className="d-flex justify-content-center w-50"
                        >
                            <i className="bi bi-trophy-fill"> Ranking</i>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        </div>
    );
}

export default App;
