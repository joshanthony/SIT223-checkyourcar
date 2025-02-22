import React, { Component } from 'react';
import axios from 'axios';
import Results from '../components/Results/Results';
import Spinner from '../components/Spinner/Spinner';
import logo from '../assets/logo.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make: '',
            model: '',
            year: '',
            cars: [],
            results: [],
            showResults: false,
            selected: [],
            loading: false,
            errorMessage: null
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.makeChangeHandler = this.makeChangeHandler.bind(this);
        this.modelChangeHandler = this.modelChangeHandler.bind(this);
        this.yearChangeHandler = this.yearChangeHandler.bind(this);
    }

    componentDidMount() {

        axios
            .get('https://checkyourcar.herokuapp.com/api/carlist/')
            .then(res => {
                this.setState({ cars: res.data });
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log([event.target.name]);
        console.log(event.target.value);
    }

    makeChangeHandler = ({ target: { value } }) => {
        this.setState({ make: value });
    }

    modelChangeHandler = ({ target: { value } }) => {
        this.setState({ model: value });
    }

    yearChangeHandler = ({ target: { value } }) => {
        this.setState({ year: value });
    }

    submitHandler(event) {
        event.preventDefault();

        this.setState({loading: true});

        const make = event.target[0].value;
        const model = event.target[1].value;
        const year = event.target[2].value;

        axios.get('https://checkyourcar.herokuapp.com/api/issues/', {
            params: {
                make: make,
                model: model,
                year: year
            }
        })
        .then(res => {
            //let issues = [];
            //res.data.map((issue) => { issues = [...issues, issue.issues] });
            if (res.data.length < 1) {
                this.setState({ results: [], loading: false, errorMessage: "No data available, please try a different search! e.g. Toyota Yaris 2006" });
            } else {
                this.setState({ results: res.data, loading: false, errorMessage: null });
                this.toggleResultsHandler();
                console.log(this.state.results);
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({ errorMessage: "No data available, please try a different search! e.g. Toyota Yaris 2006" });
        });

        if(this.state.results.length) {
            this.setState({loading: false});
            this.toggleResultsHandler();
        }
    }

    toggleResultsHandler = () => {
        const doesShow = this.state.showResults;
        this.setState({
            showResults: true
        });
    }

    render() {
        let results = null;

        if(this.state.showResults) {
        results = <Results
            results={this.state.results} />
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
                        <h1><img className="logo" src={logo} /></h1>
                        <h2>Enter Your Car Details</h2>
                        <h4>e.g. Honda Jazz 2010</h4>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-4">
                    <div className="col-4">
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <select name="make" className="form-control form-control-lg" onChange={this.makeChangeHandler}>
                                {this.state.cars.map(o => <option value={o.make}>{o.make}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="model" className="form-control form-control-lg" onChange={this.modelChangeHandler}>
                                {this.state.cars.map(o => <option value={o.model}>{o.model}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="year" className="form-control form-control-lg" onChange={this.yearChangeHandler}>
                                    {this.state.cars.map(o => <option value={o.year}>{o.year}</option>)}
                                </select>
                            </div>
                            <input type="submit" value="Find Issues" className="btn btn-primary btn-lg" />
                        </form>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-6">
                        {this.state.loading ? <Spinner text="Loading..." /> : results}
                        <div>{errorMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;