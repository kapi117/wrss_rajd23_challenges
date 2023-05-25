import React from "react";

const HomeDescription = () => {
    return (
        // create container for centered text where i describe the app
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-8 text-center ">
                    <br />
                    <h3>Witajcie!</h3>
                    Widzę że zadowoleni, możecie w końcu odpocząć po studenckim
                    zapierdzielu. Ale halo! Nie tak szybko! Ojca samego z robotą
                    zostawicie?
                    <br /> <br />
                    <h2>
                        Do roboty! <br />
                    </h2>
                    <br />
                    <h4>O co chodzi?</h4>
                    <p>
                        W poniższych zakładkach możecie znaleźć zadania, które
                        możecie wykonać, aby uzyskać punkty oraz ranking, w
                        którym na żywo będą widoczne wyniki wszystkich drużyn.
                        <br /> <br />
                        Zadania wykonujecie w zespołach, których nazwę oraz
                        skład podajecie przy zgłaszaniu wykonania pierwszego
                        zadania.
                        <br /> <br />
                        Wykonanie zadania należy zgłosić do jednego z członków
                        WRSS (podając nazwę zadania i zespołu), który je
                        sprawdzi i przyzna punkty.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeDescription;
