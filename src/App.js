import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import Home from './components/Onboarding';
import Login from './components/Login/Login';
import SignUpStudent from './components/SignUpStudent';
import SignUpTeacher from './components/SignUpTeacher';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" component={Onboarding} /> */}
            <Route path="/logUser" component={Login} />
            <Route path="/newStudent" component={SignUpStudent} /> 
            <Route path="/newTeacher" component={SignUpTeacher} /> 
            <Route path="/envio" component={Button} />
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default App;
