import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Glyphicon, MenuItem } from 'react-bootstrap';
import { handleAddTicket, addTicketFinished, handleChangeStyle } from '../../redux/modules/dataReducer.js'


class ProjectSearch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      show: false,
      inputFilter: ''
    };
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(event) {
    this.setState({
      inputFilter: event.target.value
    });
  }

  render() {
    // let data = this.props.data
    // let activeProject = this.props.projNumber
    // let activeTasks = [];

    // if (data === undefined || data.length === 0) {
    //   data = [{
    //     id: '',
    //     user: '',
    //     projects: []
    //   }]
    // } else if (data[0].projects.length == 0) {

    //   data = data[0]
    //   activeTasks = []
    // } else {
    //   data = data[0]
    //   activeTasks = data.projects[activeProject].tasks
    // }
    let projectList = this.props.projectList
    let projectListAr = []
    let self = this
    //on initial render, projectList is undefined, so set a error capture to set to an empty array
    if (projectList === undefined) {
      projectList = []
    } else {
      projectListAr = projectList
      .filter(item => {
        console.log(item.projTitle)
        console.log(this.state.inputFilter)
        !this.state.inputFilter || item.projTitle.toLowerCase().includes(this.state.inputFilter)})
      .map(function (obj, i) {
        return <MenuItem eventKey={i} key={i} onSelect={self.changeProject}>{obj.projTitle}</MenuItem>
      })
    }
    console.log(projectListAr)
    return (

      <div className='searchProjects'>
        <Button className='searchSign' bsStyle="primary" onClick={this.handleShow}>
          <Glyphicon className="glyphicon glyphicon-search" glyph="" />
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <input id='searchInput' onChange={this.handleChange}></input>
            <hr />
            {projectListAr}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary">Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
    projNumber: state.changeProjectReducer.projNumber
  }
}

export default connect(mapStateToProps)(ProjectSearch)

