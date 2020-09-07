import React, { Component } from 'react';
import axios from 'axios';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import './App.css';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Header from '../components/Header/Header';

const list = [
  {
    "id": 1,
    "title": "title 1",
    "body": "body 1"
  },
  {
    "id": 2,
    "title": "title 2",
    "body": "body 2"
  },
  {
    "id": 3,
    "title": "title 3",
    "body": "body 3"
  }
]

class App extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    //this.getIssues();
  }

  // getIssues() {
  //   axios
  //     .get('http://127.0.0.1:8000/api/')
  //     .then(res => {
  //       this.setState({ issues: res.data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Header isAuthenticated={this.state.isAuthenticated} />
          <div class="container">
            <Switch>
              <Route path="/user-account" exact component={Account} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
