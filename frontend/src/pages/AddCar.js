import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make: '',
            model: '',
            year: '',
            loading: false,
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

        const make = this.state.make;
        const model = this.state.model;
        const year = this.state.year;

        if ( make == null || make == "" || model == null || model == "" || year == null || year == "" ) {
            this.setState({errorMessage: 'Please complete all fields'});
        } else {
        
            this.setState({loading: true});

            // axios.defaults.headers = {
            //     "Content-Type": "application/json",
            //     Authorization: `Token ${this.props.token}`
            // };

            // axios
            //     .post('http://127.0.0.1:8000/api/', {
            //         make: make,
            //         model: model,
            //         year: year
            //     })
            //     .then(function (response) {
            //         console.log(response);
                        // this.setState({errorMessage: null});
                        // this.props.history.push('/account');
            //     })
            //     .catch(function (error) {
            //         console.log(error);
                        // this.setState({errorMessage: 'Adding car failed, please try again'});
            //     });

            this.props.history.push('/account');
        }
    }   

    render() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/login');
        }
        let errorMessage = (
            <p>&nbsp;</p>
        );

        if (this.state.errorMessage !== null) {
            errorMessage = (
                <p className="error-msg">{this.state.errorMessage}</p>
            );
        }

        return (
            <div className="Home">
                <div className="row">
                    <div className="col">
                        <h1 className="page-title display-4">Add Car</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-4">
                    <div className="col-4">
                        <div>{errorMessage}</div>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input type="text" placeholder="Make" name="make" value={this.state.make} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Model" name="model" value={this.state.model} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Year" name="year" value={this.state.year} onChange={this.changeHandler} className="form-control form-control-lg" />
                            </div>
                            <input type="submit" value="Add Car" className="btn btn-primary btn-lg" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddCar);