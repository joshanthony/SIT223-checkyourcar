import React, { Component } from 'react';
import axios from 'axios';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Home from '../pages/Home';
import Account from '../pages/Account';
import AddCar from '../pages/AddCar';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from '../components/Header/Header';
import { history } from '../helpers/History';
import * as actions from '../store/Actions/Auth';

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
    this.props.onTryAutoSignup();
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
      <Router history={history}>
        <div className="App">
          <Header {...this.props} />
          <div class="container mb-4">
            <Switch>
              <Route path="/account" exact render={(props) => ( <Account {...this.props} />)} />
              <Route path="/add" exact render={(props) => ( <AddCar {...this.props} />)} />
              <Route path="/settings" exact render={(props) => ( <Settings {...this.props} />)} />
              <Route path="/login" exact render={(props) => ( <Login {...this.props} />)} />
              <Route path="/register" exact render={(props) => ( <Register {...this.props} />)} />
              <Route path="/" exact render={(props) => ( <Home {...this.props} />)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
