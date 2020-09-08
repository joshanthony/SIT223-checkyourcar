import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import Cars from '../components/Cars/Cars';
import Spinner from '../components/Spinner/Spinner';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            showResults: false,
            loading: true
        };
        this.deleteResultHandler = this.deleteResultHandler.bind(this);
    }

    componentDidMount() {
        const results = [
            {
                "id": 1,
                "make": "Toyota",
                "model": "Camry",
                "year": "2019",
                "issues": [
                    {
                        "id": 1,
                        "name": "Airbag malfunction in 2007 serial numbers",
                        "description": "There has been a recall of all Toyota Camry cars with 2007 serial numbers"

                    },
                    {
                        "id": 2,
                        "name": "Airbag malfunction in 2008 serial numbers",
                        "description": "There has been a recall of all Toyota Camry cars with 2008 serial numbers"
                    }
                ]
            },
            {
                "id": 2,
                "make": "Ford",
                "model": "Fiesta",
                "year": "2016",
                "issues": [
                    {
                        "id": 1,
                        "name": "Airbag malfunction in 2007 serial numbers",
                        "description": "There has been a recall of all Toyota Camry cars with 2007 serial numbers"
                    },
                    {
                        "id": 2,
                        "name": "Airbag malfunction in 2008 serial numbers",
                        "description": "There has been a recall of all Toyota Camry cars with 2008 serial numbers"
                    }
                ]
            }
        ]

        // axios.defaults.headers = {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${this.props.token}`
        // };

        // axios
        //     .get('http://127.0.0.1:8000/api/cars/')
        //     .then(res => {
        //         this.setState({ cars: res.data });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        this.setState({
            results: results,
            showResults: true,
            loading: false
        });
    }

    deleteResultHandler = (resultIndex, id) => {
        const results = [...this.state.results];
        results.splice(resultIndex, 1);
        this.setState({results: results});

        // TODO tell the server a result is deleted
        // axios.defaults.headers = {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${this.props.token}`
        // };
        // axios
        //     .delete(`http://127.0.0.1:8000/api/${id}/delete/`)
        //     .then(res => {
        //         if (res.status === 204) {
        //             // TODO RETURN ERROR MESSAGE FOR VARIOUS ERROR CODES
        //         }
        //     })

    }

    render() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/login');
        }
        let results = null;

        if(this.state.showResults && this.props.isAuthenticated) {
            results = <Cars
                results={this.state.results}
                clicked={this.deleteResultHandler} />
        }
        return (
            <div className="Home">
                <div class="row">
                    <div class="col">
                        <h1 className="page-title display-4">My Account</h1>
                    </div>
                </div>
                <div class="row justify-content-md-center mb-4 mt-4">
                    <div class="col-4">
                        <Link className="btn btn-primary" to="/add">Add New Car</Link> <Link className="btn btn-secondary" to="/settings">Account Settings</Link>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-6">
                        {this.state.loading ? <Spinner text="Loading..." /> : results}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Account);