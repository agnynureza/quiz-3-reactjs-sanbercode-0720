import React from 'react';
import Routes from './quiz/router'
import Home from './quiz/index' 
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Home/>
      <Routes/>
    </Router>
  );
}

export default App;
