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
            loading: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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
    }

    submitHandler(event) {
        event.preventDefault();

        this.setState({loading: true});

        axios.get('https://checkyourcar.herokuapp.com/api/issues/', {
            params: {
                make: this.state.make,
                model: this.state.model,
                year: this.state.year
            }
        })
        .then(res => {
            //let issues = [];
            //res.data.map((issue) => { issues = [...issues, issue.issues] });
            this.setState({ results: res.data, loading: false });
            this.toggleResultsHandler();
            console.log(this.state.results);
        })
        .catch(err => {
            console.log(err);
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

        return (
            <div className="Home">
                <div className="row">
                    <div className="col">
                        <h1><img className="logo" src={logo} /></h1>
                        <h2>Enter Your Car Details</h2>
                    </div>
                </div>
                <div className="row justify-content-md-center mb-4 mt-4">
                    <div className="col-4">
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
                            <div className="form-group">
                                <select name="make" className="form-control form-control-lg" onChange={this.changeHandler}>
                                {this.state.cars.map(o => <option value={o.make}>{o.make}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="model" className="form-control form-control-lg" onChange={this.changeHandler}>
                                {this.state.cars.map(o => <option value={o.model}>{o.model}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <select name="year" className="form-control form-control-lg" onChange={this.changeHandler}>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;