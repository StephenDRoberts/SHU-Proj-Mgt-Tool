import React, { Component } from 'react';
import Nav from './components/general/Nav.js';
import './App.css';
import Board from './components/kanban/Board.js';
import Dashboard from './components/dashboard/Dashboard.js';
import AddTicket from './components/kanban/AddTicket.js';
import Save from './components/kanban/Save.js';
import ProjectDropdown from './components/general/ProjectDropdown.js';

class App extends Component {
  constructor() {
    super();
    this.changeDisplay = this.changeDisplay.bind(this)
    this.handleAddTicket = this.handleAddTicket.bind(this)
    
    this.state = {
      display: 'Kanban',
      data: '',
      activeProject: '',
      projLocation: 0,
      activeTasks: '',
      projectList: []
    }

  }

  componentDidMount() {
    let self = this
    fetch('/api/provideData', {
      method: 'get',
    })
      .then(function (response) {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject("Some Random Error");

      })
      .then(function (myData) {

        self.setState({
          data: myData[0],
          // activeProject: myData[0].projects[0],
          // activeTasks: myData[0].projects[0].tasks,
          // projectList: myData[0].projects
        })
      }).then(function(){
        //set the state of the individual components here so that when we update state later, we can just update
        //the whole data object which will the update the individual sections automatically.
        self.setState({
          activeProject: self.state.data.projects[0],
          activeTasks: self.state.data.projects[0].tasks,
          projectList: self.state.data.projects
        })
      })

  }


  //changes display according to Nav item selected
  changeDisplay = (newDisplay) => {
    this.setState({ display: newDisplay })
  }

  handleProjectToggle = (num) => {
    this.setState({
      activeProject: this.state.data.projects[num],
      activeTasks: this.state.data.projects[num].tasks
    })
  }

  handleAddTicket(data){
  
    let allData = this.state.data
    let projLocation = this.state.projLocation
    allData.projects[projLocation].tasks.push(data)
    
    this.setState({data: allData})
    
  }

  render() {
    console.log(this.state.data)
    if (this.state.display === 'Kanban') {
      return (
        <div className="App">
          <div className='header'>SHU Module 1 Assignment 2</div>
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={this.state.data.projects} changeProject={this.handleProjectToggle} />
          <Board tasks={this.state.activeTasks} />
          <Save/>
          <AddTicket addTicket={this.handleAddTicket} activeProject={this.state.activeProject} activeTasks={this.state.activeTasks}/>
        </div>
      );

    } else {
      return (
        <div className="App">
          <div className='header'>SHU Module 1 Assignment 2</div>
          <Nav parentEvent={this.changeDisplay} />
          <Dashboard />
        </div>
      );
    }

  }
}

export default App;
