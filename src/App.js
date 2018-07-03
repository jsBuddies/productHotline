import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from './components/form/Form.css';
import Form from './components/form/Form';

class App extends Component {
  constructor(){
    super();

    this.state ={
      formInputs: {}
    }
  }

  adminPage = () => {
    this.props.history.push("/admin/form");
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state)
    // this.setState({
    //   formInputs: this.state
    // })
  }

  
  render() {
    const FormContainer = (props) => {
      return (
        <Form 
          submit={this.submitHandler}
        />
      )
    }
    return <React.Fragment>
        hellooooo jackieeee
        <button onClick={this.adminPage}>admin page</button>
        <Form submit={this.submitHandler} />
      <BrowserRouter>
      
          {/* <Route exact path="/" component={App} /> */}
          <Route path="/admin/form" render={(props)=><Form submit={this.submitHandler} {...props} string={'text'} />} />
     
      </BrowserRouter>
      </React.Fragment>;
  }
}

export default App;
