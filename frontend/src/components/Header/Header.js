import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";

const header = (props) => {
    let isAuthenticated = 'false';
    if(props.isAuthenticated) {
        isAuthenticated = 'true'
    }
    return (
        <div className="header mb-5">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">CheckYourCar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/user-account">Account</Link>
                    </li>
                    </ul>
                    <span className="navbar-text">
                        Logged in: {isAuthenticated}
                    </span>
                </div>
            </nav>
        </div>
    );
};

export default header;