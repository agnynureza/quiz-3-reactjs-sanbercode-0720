import React from 'react'
import Home from './index'
import About from './about'
import Contact from './contact' 
import Movies from './movies'

import { Switch, Route } from "react-router";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path="/contact">
        <Contact/>
      </Route>
      <Route exact path="/movies">
        <Movies/>
      </Route>
      <Route exact path="/login">
        
      </Route>
    </Switch>
  );
};

export default Routes;