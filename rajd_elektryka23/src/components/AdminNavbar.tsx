import React from "react";
import "./styles.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const AdminNavbar: React.FC = () => {
    const location = useLocation();

    const fab_link =
        location.pathname === "/admin/teams"
            ? "/admin/add_team"
            : "/admin/complete_challenge";

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="bottom" className="p-0">
                <Nav className="justify-content-between container-fluid d-flex m-0 p-0">
                    <NavLink
                        to="/admin/challenges"
                        className="d-flex justify-content-center w-50 py-3 nav-link-item"
                    >
                        <i className="bi bi-list-task"> Zadania</i>
                    </NavLink>
                    <NavLink
                        to="/admin/teams"
                        className="d-flex justify-content-center w-50 py-3 nav-link-item"
                    >
                        <i className="bi bi-people-fill"> Zespoły</i>
                    </NavLink>
                </Nav>
            </Navbar>
            <div className="fab-container">
                <NavLink
                    to={fab_link}
                    className="fab-button-link align-items-center d-flex justify-content-center w-100 h-100"
                >
                    <button
                        className="btn btn-dark pmd-btn-fab pmd-ripple-effect pmd-btn-raised fab-button align-self-center"
                        type="button"
                    >
                        <FiPlus />
                    </button>
                </NavLink>
            </div>
        </>
    );
};

export default AdminNavbar;
