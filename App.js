import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Course from './Components/course';
import Nodue from './Components/nodue';
import Navbar from './Components/customNavbar';
import transcripts from './Components/transcripts';


class App extends Component{
  render()
{  return (
    <Router>
      <Navbar />
      <div>      
        <Route exact path = "/" component={Home}/>
        <Route path = "/course" component={Course}/>
        <Route path = "/nodue" component={Nodue}/>        
        <Route path = "/transcripts" component={transcripts}/>
        
      </div>
    </Router>
  );
}
}

export default App;
