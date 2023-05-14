import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./styles.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import wrssEmails from "../config/wrssEmails";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();

    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<any>(null);

    const auth = getAuth(app);

    auth.onAuthStateChanged((user) => {
        if (user) {
            if (wrssEmails.includes(user.email!) === false) {
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
        <div className="bg-dark d-flex align-items-center justify-content-center vh-100">
            <Container className="bg-light p-5 rounded">
                <h1 className="text-center mb-4">
                    Zalogowano pomyślnie! {user.email}
                </h1>
                <Button
                    variant="outline-dark"
                    className="w-100"
                    onClick={() => auth.signOut()}
                >
                    Wyloguj
                </Button>
            </Container>
        </div>
    );
};

export default AdminPage;
