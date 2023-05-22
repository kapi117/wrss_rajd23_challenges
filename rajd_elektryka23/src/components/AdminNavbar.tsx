import React from "react";
import "./styles.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" className="p-0">
            <Nav className="justify-content-between container-fluid d-flex m-0 p-0">
                <NavLink
                    to="challenges"
                    className={`d-flex justify-content-center w-50 py-3 nav-link-item`}
                >
                    <i className="bi bi-list-task"> Zadania</i>
                </NavLink>
                <NavLink
                    to="teams"
                    className={`d-flex justify-content-center w-50 py-3 nav-link-item`}
                >
                    <i className="bi bi-people-fill"> Zespoły</i>
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default AdminNavbar;
