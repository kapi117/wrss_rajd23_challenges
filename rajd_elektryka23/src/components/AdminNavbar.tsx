import React from "react";
import "./styles.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const AdminNavbar = () => {
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
                <button
                    className="btn btn-dark pmd-btn-fab pmd-ripple-effect pmd-btn-raised fab-button"
                    type="button"
                >
                    <FiPlus />
                </button>
            </div>
        </>
    );
};

export default AdminNavbar;
