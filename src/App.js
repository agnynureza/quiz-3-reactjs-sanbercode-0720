import React from 'react';
import Routes from './quiz/router'
import Navbar from './quiz/navbar'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes/>
    </Router>
  );
}

export default App;
