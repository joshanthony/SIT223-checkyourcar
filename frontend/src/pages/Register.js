import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/Actions/Auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password1: null,
            password2: null,
            submitted: false,
            errorMessage: null
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);        
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler(event) {
        event.preventDefault();

        const username = this.state.username;
        const email = this.state.email;
        const password1 = this.state.password1;
        const password2 = this.state.password2;

        if (password1 !== password2) {
            this.setState({errorMessage: 'Passwords do not match!'});
        } else if ( username == null || username == "" || email == null || email == "" || password1 == null || password1 == "" || password2 == null || password2 == "" ) {
            this.setState({errorMessage: 'Please complete all fields'});
        } else {
            this.setState({errorMessage: null, submitted: true});
            this.props.onAuth(
                username,
                email,
                password1,
                password2
            );
        }

        
    }

    render() {

        if(this.props.isAuthenticated) {
            this.props.history.push('/account');
        }

        if(this.state.submitted && this.props.error == null && !this.props.loading) {
            this.props.history.push('/account');
        }

        let errorMessage = (
            <p>&nbsp;</p>
        );
        if (this.props.error) {
            errorMessage = (
                <p className="error-msg">{this.props.error.message}</p>
            );
        }

        if (this.state.errorMessage !== null) {
            errorMessage = (
                <p className="error-msg">{this.state.errorMessage}</p>
            );
        }

        let btnMessage = "Register";
        if(this.props.loading) {
            btnMessage = "Loading...";
        }

        return (
            <div className="Account">
                <div className="row">
                    <div className="col">
                        <h1 className="page-title display-4">Register</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-0">
                    <div className="col-4">
                        <div>{errorMessage}</div>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" name="password1" value={this.state.password1} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <input type="submit" value={btnMessage} className="btn btn-primary btn-lg" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));