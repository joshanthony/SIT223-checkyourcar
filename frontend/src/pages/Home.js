import React, { Component } from 'react';
import Results from '../components/Results/Results';
import Spinner from '../components/Spinner/Spinner';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make: '',
            model: '',
            year: '',
            results: [],
            showResults: false,
            selected: [],
            loading: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler(event) {
        event.preventDefault();

        this.setState({loading: true});

        const results = [
            {
                "id": 1,
                "name": "Airbag malfunction in 2007 serial numbers",
                "description": "There has been a recall of all Toyota Camry cars with 2007 serial numbers",
                "selected": false
            },
            {
                "id": 2,
                "name": "Airbag malfunction in 2008 serial numbers",
                "description": "There has been a recall of all Toyota Camry cars with 2008 serial numbers",
                "selected": false
            },
            {
                "id": 3,
                "name": "Camry streering issues in the late 90s",
                "description": "Any Camry owners from the mid to late 90s should contact their local dealer",
                "selected": false
            }
        ]

        // axios
        //     .get('http://127.0.0.1:8000/api/')
        //     .then(res => {
        //         this.setState({ results: res.data });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        if(results && results.length) {
            this.setState({results: results, loading: false});
            this.toggleResultsHandler();
        }
    }   

        // history.push({
        //     pathname: '/results',
        //     state: { make: data.make, model: data.model }
        // });

    selectResultHandler = (id) => {
        // get the index of the result id where the event happened
        const resultIndex = this.state.results.findIndex(r => {
            return r.id === id;
        });
        // get the specific result object and copy it to a new object using the index
        const result = {
            ...this.state.results[resultIndex]
        };
        // update the result's selected value to the new selected value
        result.selected = !result.selected;
        // copy the full state into a new array
        const results = [...this.state.results];
        // set the result array copy to override the results state array at this index
        results[resultIndex] = result;

        //const selected = [...this.state.selected];
        //selected.push(resultIndex);
        this.setState({results: results});
    }

    toggleResultsHandler = () => {
        const doesShow = this.state.showResults;
        this.setState({
            showResults: !doesShow
        });
    }

    render() {
        let results = null;

        if(this.state.showResults) {
        results = <Results
            results={this.state.results}
            clicked={this.selectResultHandler} />
        }

        return (
            <div className="Home">
                <div className="row">
                    <div className="col">
                        <h1 className="page-title display-4">CheckYourCar</h1>
                        <h3>Enter your car make and model</h3>
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