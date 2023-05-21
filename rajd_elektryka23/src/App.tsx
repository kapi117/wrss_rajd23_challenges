import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { FirebaseApp, initializeApp } from "firebase/app";
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
    Firestore,
    getDocs,
} from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { faker } from "@faker-js/faker";
import { Nav, Navbar, Table } from "react-bootstrap";
import firebaseConfig from "./config/firebaseConfig";
import ListOfChallenges from "./components/ListOfChallenges";
import Ranking from "./components/Ranking";
import { get } from "http";
import { Challenge, Team } from "./config/types";

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
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    let teamsRef: CollectionReference<DocumentData> = collection(db, "teams");
    let metaRef: CollectionReference<DocumentData> = collection(db, "metadata");
    let unsubscribe = onSnapshot(teamsRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().name}`);
        });
    });

    const [isRanking, setIsRanking] = useState(false);

    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const [teams, setTeams] = useState<Team[]>([]);

    const getChallengesFromFirestore = useCallback(async () => {
        setChallenges([]);

        const challengesRef = collection(db, "challenges");

        const querySnapshot = await getDocs(challengesRef);

        let temp_challenges: Challenge[] = [];

        let count: number = 0;

        querySnapshot.forEach((doc) => {
            count++;
            temp_challenges = [
                ...temp_challenges,
                {
                    description: doc.data().description,
                    points: doc.data().points,
                    id: doc.id,
                },
            ];
        });

        console.log(count);

        setChallenges(temp_challenges);
    }, []);

    useEffect(() => {
        getChallengesFromFirestore();
    }, []);

    const getTeamsFromFirestore = useCallback(async () => {
        const teamsRef = collection(db, "teams");

        const querySnapshot = await getDocs(teamsRef);

        let temp_teams: Team[] = [];

        querySnapshot.forEach((doc) => {
            temp_teams = [
                ...temp_teams,
                {
                    name: doc.data().name,
                    points: doc.data().points,
                    completedChallengesIds: doc.data().completedChallengesIds,
                    completedChallengesPoints:
                        doc.data().completedChallengesPoints,
                    extraPoints: doc.data().extraPoints,
                    members: doc.data().members,
                    extraDescriptions: doc.data().extraDescriptions,
                },
            ];
        });

        setTeams(temp_teams);
    }, []);

    useEffect(() => {
        getTeamsFromFirestore();
    }, []);

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
                {isRanking ? (
                    <Ranking teams={teams}></Ranking>
                ) : (
                    <ListOfChallenges
                        challenges={challenges}
                    ></ListOfChallenges>
                )}
                <Navbar bg="dark" variant="dark" fixed="bottom">
                    <Nav className="justify-content-between container-fluid d-flex">
                        <Nav.Link
                            onClick={() => setIsRanking(false)}
                            className="d-flex justify-content-center w-50"
                        >
                            <i className="bi bi-house-fill"> Zadania</i>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => setIsRanking(true)}
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
