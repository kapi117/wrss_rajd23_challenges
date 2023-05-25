import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    CollectionReference,
    DocumentData,
    onSnapshot,
    doc,
    setDoc,
    Firestore,
    getDocs,
} from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";
import ListOfChallenges from "./components/ListOfChallenges";
import Ranking from "./components/Ranking";
import { Challenge, Team } from "./config/types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AddTeamPage from "./components/AddTeamPage";
import MarkTaskCompleted from "./components/MarkTaskCompleted";
import HomeDescription from "./components/HomeDescription";
import AdminDescription from "./components/AdminDescription";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function updateTeamInFirestore(team: Team) {
    setDoc(doc(db, "teams", team.name), team);
}

function App() {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    let teamsRef: CollectionReference<DocumentData> = collection(db, "teams");

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
    }, [db]);

    useEffect(() => {
        getChallengesFromFirestore();
    }, [getChallengesFromFirestore]);

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
                        <Route path="/" element={<HomeDescription />} />

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
                        <Route path="" element={<AdminDescription />} />
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
                        <Route
                            path="/admin/add_team"
                            element={<AddTeamPage teams={teams} />}
                        />
                        <Route
                            path="/admin/complete_challenge"
                            element={
                                <MarkTaskCompleted
                                    teams={teams}
                                    challenges={challenges}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
