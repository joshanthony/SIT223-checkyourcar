import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/Actions/Auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler(event) {
        event.preventDefault();

        this.setState({submitted: true});
        this.props.onAuth(this.state.username, this.state.password);
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

        let btnMessage = "Login";
        if(this.props.loading) {
            btnMessage = "Loading...";
        }

        return (
            <div className="Account">
                <div className="row">
                    <div className="col">
                        <h1 className="page-title display-4">Login</h1>
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
                                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} className="form-control form-control-lg" />
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));