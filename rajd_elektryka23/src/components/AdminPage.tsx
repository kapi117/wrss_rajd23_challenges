import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./styles.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import wrssEmails from "../config/wrssEmails";
import {
    Firestore,
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore";
import { parse } from "csv-parse";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const db: Firestore = getFirestore(app);

    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<any>(null);

    const auth = getAuth(app);

    function loadChallengesFromCSV() {
        const file_content =
            "Najwieksza choinka z puszek i butelek po WUDZIE (oceniana wysokość),80\nZdjęcie z jak największa ludzka piramida (min. 3 piętra),40\nSkradnij buziaka wursowiczce 🤪 ,30\nUpiecz pierniczki ,20\nZrób zdj z dzikim zwierzem,40\nZłów rybę z wody (pod okiem ratownika ;),60\nPrzefarbuj włosy ,50\nOgól się na łyso ,70\nZdj jak siedzisz na drzewie ,30\nPogłaszcz pieska ,5\nNapisz świąteczna piosenkę i zaśpiewaj ją nam,30\nWejdz posmarowany kremem w piach i zrób aniołka,50\nZgól jedną brew,40\nZgól dwie brwi,90\nPiórun na głowie wytnij,70\nPofarbuj włosy na nodze,30\nZałóż spólke komandytową,40\nUmów się na rozmowe rekrutacyjną,20\nSelfie z dziekanem (za jego zgoda),60\nPrzynies podanie o skreślenie z listy studentów,10\nUłóż ze swoich znajomych WIET,10\nMiej koszulke innego wydziału ,30\nNagraj piosenkę świąteczną,40\nUmyj okna,50\nMiej legitke ze wszystkimi naklejkami,50\nZdjęcie przy browarze żywiec,10\nZdjęcie z Sołtysem Zarecza,30\nZdjęcie w Czchowie w dniu Rajdu,5\nMandat za picie w miejscu publicznym w dniu Rajdu,100\nPodłączyć iPhone'a pod microUSB,80\nPrzyjechać z mamą na rajd,90\nPozytywny test ciążowy (za drugi i każdy nastpny +500) == Ogłoś dobrą nowine,100\nWytrzymaj w autokarze bez sikania ,10\nNapisz list do św mikołaja i daj go Mikołajowi,20\nZdjęcie z czlowiekiem - ptakiem,20\nFacet w makijażu i sukience na dyskotece w piątek,60\nKoszulka z Nauki Samogłosek,30\nDać komuś fajny prezent z okazji świąt ,20\nUtopienie się ,-100\nPrzymusowa wycieczka na najbliższy SOR,-200\nUpieczenie ciasta dla członków WRSS,100\nOgolenie jednej nogi,20\nWyślij kartkę z życzeniami świątecznymi do biura WRSS,10\nZgoda rodzica na rajd,5\nZdjęcie ze szczytu góry Grincha i selfiak z nim,5\nUlep bałwana,20\nWyślij swoje CV do biedronki na kase,10\nZrób ośmiornice vape albo inny fajny trik,15\nZagraj na instrumencie jingle bells,20\nPrzyrządzić i wypić solnik,30\nPoradzić sobie ze złodziejami jak Kevin,40\nNagrać piękną i długą reklamę Apartu,35\nUdekorować choinkę,20\nObierz mandarynkę stopami,15\nPrzez cały dzień mów tylko 'nawzajem',40\nŻycz pani kasjerce wesołych świąt,15\nPrzyłap świętego mikołaja na gorącym uczynku,25\nZagrać we flanki napojem minimum 10%,15\nPrzyjmij kolędę,15\nZostań kolędnikiem,35\nZorganizuj pasterkę z grzanym winem,50\nPrzełam się opłatkiem z 10 osobami,30\nPozmywaj naczynia,25\nZamrozić siostrę,-30\nCoś stłuc,-20\nZrobić maraton 'Listy do M' i nie zasnąć,30\nWyzerować słoik majonezu,35";
        type Challenge = {
            description: string;
            points: number;
        };

        const lines: string[] = file_content.split("\n");
        const challenges: Challenge[] = [];
        lines.forEach((line) => {
            const [description, points] = line.split(",");
            addDoc(collection(db, "challenges"), {
                description: description,
                points: parseInt(points),
            });
            console.log(description, points);
        });
    }

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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex text-center w-75 flex-column">
                <div className="p-2 w-100">
                    <Button variant="primary" className="my-2">
                        Dodaj zespół
                    </Button>
                </div>
                <div className="p-2 w-100">
                    <Button variant="secondary" className="my-2">
                        Zalicz zadanie
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
