import React, { useState } from "react";
import Ranking from "./Ranking";
import ListOfChallenges from "./ListOfChallenges";
import { Nav, Navbar } from "react-bootstrap";
import { Challenge, Team } from "../config/types";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface HomeProps {
    challenges: Challenge[];
    teams: Team[];
}

const Home: React.FC<HomeProps> = ({ challenges, teams }) => {
    const [isRanking, setIsRanking] = useState(false);
    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-8 text-center">
                    <h1 className="font-xmas text-dark my-3">
                        Ho Ho Ho! 🎅 <br /> Gotowi na bojowe zadania?
                    </h1>
                </div>
            </div>
            <Outlet />
            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Nav className="justify-content-between container-fluid d-flex">
                    <NavLink
                        to="/challenges"
                        className="d-flex justify-content-center w-50 my-2 nav-link-item"
                    >
                        <i className="bi bi-house-fill"> Zadania</i>
                    </NavLink>
                    <NavLink
                        to="/ranking"
                        className="d-flex justify-content-center w-50 my-2 nav-link-item"
                    >
                        <i className="bi bi-trophy-fill"> Ranking</i>
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Home;
