import React from "react";

const AdminDescription = () => {
    return (
        // create container for centered text where i describe the app
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-8 text-justify">
                    <br />
                    <h1>Witajcie adminy!</h1>
                    <br />
                    <p>
                        Poniżej znajdują się dwie zakładki - zadania w której
                        znajduje się lista zadań oraz zespoły. w której znajduje
                        się ranking zespołów.
                        <br /> <br />
                        <h3>Zgłaszanie zadania</h3>
                        Na stronie z zadaniami klikając przycisk <b> + </b> w
                        prawym dolnym rogu możecie zgłosić wykonanie zadania
                        przez drużynę. Wystarczy wybrać zadanie oraz drużynę i
                        nacisnąć przycisk{" "}
                        <a
                            href="/admin/complete_challenge"
                            className="btn btn-dark"
                        >
                            Zgłoś zadanie
                        </a>
                        <br /> <br />
                        <h3>Dodawanie zespołu</h3>
                        Na stronie z zespołami klikając przycisk <b> + </b> w
                        prawym dolnym rogu możecie dodać nowy zespół. Wystarczy
                        podać nazwę zespołu oraz wpisać członków zespołu. Po tym
                        naciśnijcie przycisk{" "}
                        <a href="/admin/add_team" className="btn btn-dark">
                            Zapisz zespół
                        </a>
                    </p>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
};

export default AdminDescription;
