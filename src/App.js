import React from 'react';
import Main from './quiz/main'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Main/>
    </Router>
  );
}

export default App;
