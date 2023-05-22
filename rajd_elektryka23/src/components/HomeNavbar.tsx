import React from "react";
import "./styles.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HomeNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" className="p-0">
            <Nav className="justify-content-center container-fluid d-flex m-0 p-0">
                <NavLink
                    to="/challenges"
                    className="d-flex justify-content-center w-50 py-3 nav-link-item h-100"
                >
                    <i className="bi bi-house-fill"> Zadania</i>
                </NavLink>
                <NavLink
                    to="/ranking"
                    className="d-flex justify-content-center w-50 py-3 nav-link-item"
                >
                    <i className="bi bi-trophy-fill"> Ranking</i>
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default HomeNavbar;
