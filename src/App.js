import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from './components/form/Form.css';

class App extends Component {
  constructor(){
    super();

    this.state ={

    }
  }

  adminPage = () => {
    this.props.history.push({ pathname: '/admin/form'})
  }

  render() {
    return (
      <React.Fragment>
        hellooooo jackieeee

        <button onClick={this.adminPage}>admin page</button>
      </React.Fragment>
    );
  }
}

export default App;
