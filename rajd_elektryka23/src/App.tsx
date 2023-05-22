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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";

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

    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

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

    const unsubscribeTeams = onSnapshot(teamsRef, (querySnapshot) => {
        const temp_teams: Team[] = [];
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data().name}`);
            temp_teams.push({
                name: doc.data().name,
                points: doc.data().points,
                completedChallengesIds: doc.data().completedChallengesIds,
                completedChallengesPoints: doc.data().completedChallengesPoints,
                extraPoints: doc.data().extraPoints,
                members: doc.data().members,
                extraDescriptions: doc.data().extraDescriptions,
            });
        });

        setTeams(temp_teams);
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home challenges={challenges} teams={teams} />}
                    >
                        <Route
                            path="/challenges"
                            element={
                                <ListOfChallenges challenges={challenges} />
                            }
                        />
                        <Route
                            path="/ranking"
                            element={<Ranking teams={teams} />}
                        />
                    </Route>
                    <Route
                        path="/admin"
                        element={
                            <AdminPage
                                challenges={challenges}
                                teams={teams}
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    >
                        <Route
                            path="/admin/challenges"
                            element={
                                <ListOfChallenges challenges={challenges} />
                            }
                        />
                        <Route
                            path="/admin/teams"
                            element={<Ranking teams={teams} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
