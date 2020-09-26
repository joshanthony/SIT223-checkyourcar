import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            make: '',
            model: '',
            year: '',
            results: [],
            showResults: false,
            loading: false,
            errorMessage: null
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        const results = []

        axios
            .get('http://127.0.0.1:8000/api/carlist/')
            .then(res => {
                this.setState({ results: res.data });

                this.setState({
                    id: results[0].id,
                    results: res.data,
                    showResults: true,
                    loading: false
                });
                console.log(res.data );
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            id: 0,
            results: results,
            showResults: true,
            loading: false
        });

        
    }

    // changeHandler = (event) => {
    //     this.setState({[event.target.name]: event.target.value});
    // }

    changeHandler = ({ target: { value } }) => {
        this.setState({ id: value });
      }

    submitHandler(event) {
        event.preventDefault();

        const id = event.target[0].value;

        this.setState({id: id});
        console.log(this.state.id);

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios
            .patch(`http://127.0.0.1:8000/api/cars/${id}/`)
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.props.history.push('/account');
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
                        <h3>Select your car to add</h3>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-4">
                    <div className="col-4">
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <select name="id" className="form-control" onChange={this.changeHandler}>
                                    {this.state.results.map(o => <option key={o.id} value={o.id}>{o.make} {o.model} ({o.year})</option>)}
                                </select>
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