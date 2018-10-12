import React, { Component } from 'react';
import Nav from './components/general/Nav.js';
import './App.css';
import Board from './components/kanban/Board.js';
import Dashboard from './components/dashboard/Dashboard.js';
import AddTicket from './components/kanban/AddTicket.js';
import ProjectDropdown from './components/general/ProjectDropdown.js';

class App extends Component {
  constructor(){
    super();
    this.changeDisplay = this.changeDisplay.bind(this)
    
    this.state = {
      display: 'Kanban',
      data: '',
      activeProject: '',
      activeTasks: '',
      projectList: []
    }
    
  }

  componentDidMount(){
    let self = this
    fetch('/api/provideData', {
      method: 'get',
  })
  .then(function(response) {
    console.log(response)  
    if (response.ok) {
      return response.json()
      }
   return Promise.reject("Some Random Error");
    
  })
      .then(function (myData) {
         
          self.setState({
            data: myData[0],
            activeProject: myData[0].projects[0],
            activeTasks: myData[0].projects[0].tasks,
            projectList: myData[0].projects
          })
      })
  }


//changes display according to Nav item selected
  changeDisplay = (newDisplay)=>{
    this.setState({display : newDisplay})
  }
  

  render() {
    
 
  if(this.state.display==='Kanban'){
    return (
      <div className="App">
        <div className='header'>SHU Module 1 Assignment 2</div>
        <Nav parentEvent={this.changeDisplay}/>
        <ProjectDropdown projectList={this.state.data.projects}/>
        <Board tasks={this.state.activeTasks}/>
        <AddTicket />
      </div>
    );

  } else {
    return (
      <div className="App">
        <div className='header'>SHU Module 1 Assignment 2</div>
        <Nav parentEvent={this.changeDisplay}/>
        <Dashboard />
      </div>
    );
  }
    
  }
}

export default App;
