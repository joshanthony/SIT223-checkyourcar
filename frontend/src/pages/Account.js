import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    loginHandler(event) {
        event.preventDefault();

        this.setState({loading: true});
        this.setState({loading: false});

        // axios
        //     .post('http://127.0.0.1:8000/api/', {
        //         'make': data.make,
        //         'model': data.model,
        //     }, {
        //         headers: {
        //             "Authorization": 'AUTHORIZATION_KEY',
        //             "Content-Type": 'application/json'
        //         }
        //     })
        //     .then(res => console.log(res))
        //     .catch(error => console.err(error))
    }

    render() {
        return (
            <div className="Account">
                <div class="row">
                    <div class="col">
                        <h1 className="page-title display-4">CheckYourCar</h1>
                        <h3>Login or Register</h3>
                    </div>
                </div>
                <div class="row justify-content-md-center mb-4 mt-4">
                    <div class="col-4">
                        <form onSubmit={this.loginHandler}>
                            <div class="form-group">
                                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div class="form-group">
                                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <input type="submit" value="Login" className="btn btn-primary btn-lg" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;