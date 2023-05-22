import React from "react";
import "./styles.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    const location = useLocation();

    const fab_link =
        location.pathname === "/admin/teams"
            ? "/admin/add_team"
            : "/admin/add_challenge";

    return (
        <>
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
            <div className="fab-container">
                <Link to={fab_link} className="fab-button-link">
                    <button
                        className="btn btn-dark pmd-btn-fab pmd-ripple-effect pmd-btn-raised fab-button"
                        type="button"
                    >
                        <FiPlus />
                    </button>
                </Link>
            </div>
        </>
    );
};

export default AdminNavbar;
