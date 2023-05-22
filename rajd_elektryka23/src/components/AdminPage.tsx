import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./styles.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import wrssEmails from "../config/wrssEmails";
import {
    Firestore,
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";
import ListOfChallenges from "./ListOfChallenges";
import { Challenge, Team } from "../config/types";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

interface AdminPageProps {
    challenges: Challenge[];
    teams: Team[];
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPage: React.FC<AdminPageProps> = ({
    challenges,
    teams,
    loggedIn,
    setLoggedIn,
}) => {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const db: Firestore = getFirestore(app);

    const [user, setUser] = useState<any>(null);
    const [isTeam, setIsTeam] = useState<boolean>(false);

    const auth = getAuth(app);

    auth.onAuthStateChanged((user) => {
        if (user) {
            if (!wrssEmails.includes(user.email!)) {
                alert("Nie masz uprawnień do tej strony!");
                auth.signOut();
                return;
            }
            setUser(user);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    return !loggedIn ? (
        <div className="bg-dark d-flex align-items-center justify-content-center vh-100">
            <Container className="bg-light p-5 rounded">
                <h1 className="text-center mb-4">
                    Zaloguj się przy pomocy konta samorządowego
                </h1>
                <Button
                    variant="outline-dark"
                    className="w-100"
                    onClick={() => signInWithPopup(auth, provider)}
                >
                    Logowanie Google
                </Button>
            </Container>
        </div>
    ) : (
        <>
            <div className="container-fluid pt-3">
                <Outlet />

                <AdminNavbar />
            </div>
        </>
    );
};

export default AdminPage;
