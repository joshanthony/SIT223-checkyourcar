import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            password1: '',
            password2: '',
            loading: false,
            confirmMessage: null
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeUserHandler = this.changeUserHandler.bind(this);
    }

    componentDidMount() {

        const user = [
            {
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "mobile": "0412345678",
                "country": "Australia",
                "postcode": "3000"
            }
        ]

        // axios.defaults.headers = {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${this.props.token}`
        // };

        // axios
        //     .get('http://127.0.0.1:8000/api/user/')
        //     .then(res => {
        //         this.setState({ user: res.data });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        this.setState({
            user: user,
            loading: false
        });
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    changeUserHandler = (event) => {
        const { user } = { ...this.state };
        const userState = user;
        const { name, value } = event.target;
        userState[name] = value;
        this.setState({user: userState});
    }

    submitHandler(event) {
        event.preventDefault();
        
        this.setState({loading: true});

        // axios.defaults.headers = {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${this.props.token}`
        // };

        // axios
        //     .post('http://127.0.0.1:8000/api/', {
        //         user: this.state.user,
        //         password1: this.state.password1,
        //         password2: this.state.password2,
        //     })
        //     .then(function (response) {
        //         console.log(response);
                    // this.setState({confirmMessage: 'Settings saved'});
                    // this.props.history.push('/account');
        //     })
        //     .catch(function (error) {
        //         console.log(error);
                    // this.setState({confirmMessage: 'Saving failed, please try again'});
        //     });

        this.setState({confirmMessage: 'Settings saved', loading: false});
        
    }   

    render() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/login');
        }

        console.log(this.state.user.name);

        let confirmMessage = (
            <p>&nbsp;</p>
        );

        if (this.state.confirmMessage !== null) {
            confirmMessage = (
                <p className="confirm-msg">{this.state.confirmMessage}</p>
            );
        }

        let btnMessage = "Save";
        if(this.props.loading) {
            btnMessage = "Saving...";
        }

        return (
            <div className="Home">
                <div className="row">
                    <div className="col">
                        <h1 className="page-title display-4">Settings</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-4">
                    <div className="col-4">
                        <div>{confirmMessage}</div>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input type="text" placeholder="Name" name="name" value={this.state.user.name} onChange={this.changeUserHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Email" name="email" value={this.state.user.email} onChange={this.changeUserHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Mobile" name="mobile" value={this.state.user.mobile} onChange={this.changeUserHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Country" name="country" value={this.state.user.country} onChange={this.changeUserHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Postcode" name="postcode" value={this.state.user.postcode} onChange={this.changeUserHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Password" name="password1" value={this.state.user.password1} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Confirm Password" name="password2" value={this.state.user.password2} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <input type="submit" value={btnMessage} className="btn btn-primary btn-lg" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Settings);