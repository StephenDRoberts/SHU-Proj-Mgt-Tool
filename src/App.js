
import React, { Component } from 'react';
import Nav from './Nav.js';
import './App.css';
import Board from './Board.js';

class App extends Component {
  constructor(){
    super();
    this.changeDisplay = this.changeDisplay.bind(this)
    
    this.state = {
      display: 'Kanban'
    }
    
  }

  changeDisplay = (newDisplay)=>{
    console.log(newDisplay)
    console.log(typeof(newDisplay))
    this.setState({display : newDisplay})
    
  }
  

  render() {
  
  if(this.state.display==='Kanban'){
    return (
      <div className="App">
        <div className='header'>SHU Module 1 Assignment 2</div>
        <Nav parentEvent={this.changeDisplay}/>
        <Board />
      </div>
    );

  } else {
    return (
      <div className="App">
        <div className='header'>SHU Module 1 Assignment 2</div>
        <Nav parentEvent={this.changeDisplay}/>
        <h2>This is a dashboard</h2>
      </div>
    );
  }
    
  }
}

export default App;
