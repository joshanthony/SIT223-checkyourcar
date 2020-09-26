import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/Actions/Auth';

const header = (props) => {
    let accountRegister = null;
    let logoutLogin = null;

    if(props.isAuthenticated) {
        accountRegister = <Link className="nav-link" to="/account">Account</Link>
        logoutLogin = <Link className="nav-link" to="/" onClick={props.logout}>Logout</Link>
    } else {
        accountRegister = <Link className="nav-link" to="/register">Register</Link>
        logoutLogin = <Link className="nav-link" to="/login">Login</Link>
    }
    return (
        <div className="header mb-5">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
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
                        {accountRegister}
                    </li>
                    <li className="nav-item active">
                        {logoutLogin}
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(header);