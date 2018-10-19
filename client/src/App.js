import React, { Component } from 'react';
import Nav from './components/general/Nav.js';
import './App.css';
import Board from './components/kanban/Board.js';
import Dashboard from './components/dashboard/Dashboard.js';
import AddTicket from './components/kanban/AddTicket.js';
import Save from './components/kanban/Save.js';
import ProjectDropdown from './components/general/ProjectDropdown.js';
import store from './redux/store.js'
import {Provider, connect} from 'react-redux'
// import {fetchData} from './redux/dbCalls/fetchData.js'
import {fetchData} from './redux/modules/redux_fetchData.js'

class App extends Component {
  constructor() {
    super();
    this.changeDisplay = this.changeDisplay.bind(this)
    this.handleAddTicket = this.handleAddTicket.bind(this)
    this.handleDeleteTicket = this.handleDeleteTicket.bind(this)
    
    this.state = {
      display: 'Kanban',
    }

  }

  componentDidMount() {
    this.props.dispatch(fetchData());
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

  handleDeleteTicket(data){
    console.log(data)
    
  }

  render() {
    let data = this.props.data
    let activeTasks = [];

    if(data.length===0){
      data= data = [{
        id: '',
        user: '',
        projects: []
      }]
    } else {
      data = data[0]
      activeTasks = data.projects[0].tasks
    }

    
    
    if (this.state.display === 'Kanban') {
      return (
        <Provider store={store}>
        
        <div className="App">
          <div className='header'>SHU Module 1 Assignment 2</div>
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={data.projects} changeProject={this.handleProjectToggle} />
          <Board tasks={activeTasks} deleteTicket={this.handleDeleteTicket}/>
          <Save/>
          <AddTicket/>
          {/* <AddTicket addTicket={this.handleAddTicket} activeProject={this.state.activeProject} activeTasks={this.state.activeTasks}/> */}
        </div>
        </Provider>
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

const mapStateToProps = (state)=>{
  console.log(state.dataReducer)
  return{
    data: state.dataReducer.data,
    loading: state.dataReducer.loading,
    error: state.dataReducer.error
  }
}

// const mapDispatchToProps = (dispatch)=>{
//   return {
//       addTicket: (ticket)=>{
//           dispatch(addTicket(ticket))
//       }
//   }
// }

export default connect(mapStateToProps)(App)

