import React, { Component } from 'react';
import Nav from './components/general/Nav.js';
import './App.css';
import Board from './components/kanban/Board.js';
import Dashboard from './components/dashboard/Dashboard.js';
import AddTicket from './components/kanban/AddTicket.js';
import Save from './components/kanban/Save.js';
import ProjectDropdown from './components/general/ProjectDropdown.js';
import EmptyDisplay from './components/general/EmptyDisplay.js';
import LoginPage from './components/general/LoginPage.js'
import Header from './components/general/Header.js'
import store from './redux/store.js'
import { Provider, connect } from 'react-redux'
import { fetchData } from './redux/modules/dataReducer.js'

class App extends Component {
  constructor() {
    super();
    this.changeDisplay = this.changeDisplay.bind(this)
    // this.handleAddTicket = this.handleAddTicket.bind(this)
    // this.handleDeleteTicket = this.handleDeleteTicket.bind(this)

    this.state = {
      display: 'Kanban',
      loggedIn: false,
      username: ''
    }

  }

  componentDidMount() {
    this.props.dispatch(fetchData(this.props.user));
  }


  //changes display according to Nav item selected
  changeDisplay = (newDisplay) => {
    this.setState({ display: newDisplay })
  }

  render() {
    
    let data = this.props.data
    console.log(data)
    console.log(this.props)
    let activeProject = this.props.projNumber
    let activeTasks = [];

    if (data.length === 0) {
      data = [{
        id: '',
        user: '',
        projects: []
      }]
    }
    // else {console.log(data[0].projects.length)}
    else if (data[0].projects.length == 0) {
      console.log(data[0].projects.length)

      activeTasks = []
    } else {
      activeTasks = data[0].projects[activeProject].tasks
    }

    // RENDER ELEMENTS

     if (data[0].projects.length == 0) {
      return (
        <Provider store={store}>

          <div className="App">
            <Header />
            <Nav parentEvent={this.changeDisplay} />
            <ProjectDropdown projectList={data[0].projects} />
            <EmptyDisplay />
            <Save />


          </div>
        </Provider>
      )
    }
    else if (this.state.display === 'Kanban') {
      return (
        <Provider store={store}>

          <div className="App">
            <Header />
            <Nav parentEvent={this.changeDisplay} />
            <ProjectDropdown projectList={data[0].projects} />
            <Board tasks={activeTasks} deleteTicket={this.handleDeleteTicket} />
            <Save />
            <AddTicket />
            {/* <AddTicket addTicket={this.handleAddTicket} activeProject={this.state.activeProject} activeTasks={this.state.activeTasks}/> */}
          </div>
        </Provider>
      );

    } else {
      return (
        <div className="App">
          <Header />
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={data[0].projects} />
          <Dashboard tasks={activeTasks} />
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
    loading: state.dataReducer.loading,
    error: state.dataReducer.error,
    projNumber: state.changeProjectReducer.projNumber,
    user: state.loginReducer.user
  }
}
export default connect(mapStateToProps)(App)

