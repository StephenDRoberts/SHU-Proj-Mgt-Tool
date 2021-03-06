import React, { Component } from 'react';
import Nav from './components/general/Nav.js';
import './App.css';
import Board from './components/kanban/Board.js';
import Dashboard from './components/dashboard/Dashboard.js';
import AddTicket from './components/kanban/AddTicket.js';
import Save from './components/kanban/Save.js';
import ProjectSearch from './components/general/ProjectSearch.js';
import ProjectDropdown from './components/general/ProjectDropdown.js';
import EmptyDisplay from './components/general/EmptyDisplay.js';
import Header from './components/general/Header.js'
import { connect } from 'react-redux'
import { fetchData } from './redux/modules/dataReducer.js'
import { handleLogin } from './redux/modules/loginReducer.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'Kanban',
      loggedIn: false,
      username: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchData(this.props.user)).then(() => {
      // looks to see if a session user has been saved
      // only for login/logout button purposes
      if (this.props.data && this.props.data[1]) {
        this.props.dispatch(handleLogin(this.props.data[1]))
      }
    })
  }

  //changes display according to Nav item selected
  changeDisplay = (newDisplay) => {
    this.setState({ display: newDisplay })
  }

  render() {
    // gets initial data for render
    let data = this.props.data
    let activeProject = this.props.projNumber
    let activeTasks = [];
    let currentProject = ''

    // if on initial render we dont have any data - set some initial parameters to be empty
    // this prevents any rendering issues of undefined keys/types
    // eg when data is blank, data.length == undefined
    if (data === undefined || data.length === 0) {
      data = [{
        id: '',
        user: '',
        projects: []
      }]
    }

    else if (data[0].projects.length === 0) {
      activeTasks = []
    } else {
      currentProject = data[0].projects[activeProject].projTitle
      activeTasks = data[0].projects[activeProject].tasks
    }

    // RENDER ELEMENTS

    // if we don't have any data (ie not logged in or no projects to display)
    if (data[0].projects.length === 0) {
      return (
        <div className="App">
          <Header />
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={data[0].projects} />
          <EmptyDisplay />
          <Save />
        </div>

      )
    }
    // if we have data to show, then show Kanban/Dashboard (whichever is selected by user)
    else if (this.state.display === 'Kanban') {
      return (
        <div className="App">
          <Header />
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={data[0].projects} currentProject={currentProject} />
          <Board tasks={activeTasks} deleteTicket={this.handleDeleteTicket} />
          <ProjectSearch projectList={data[0].projects} />
          <Save />
          <AddTicket />
        </div>

      );

    } else {
      return (
        <div className="App">
          <Header />
          <Nav parentEvent={this.changeDisplay} />
          <ProjectDropdown projectList={data[0].projects} currentProject={currentProject} />
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

