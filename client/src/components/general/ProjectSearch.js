import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Glyphicon, MenuItem } from 'react-bootstrap';
import { handleProjectToggle } from '../../redux/modules/changeProject.js'

class ProjectSearch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      show: false,
      // inputFilter: ''
    };
  }

  handleClose() {
    this.setState({ 
      show: false, 
      inputFilter: ''});
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(event) {
    this.setState({
      inputFilter: event.target.value
    });
  }
  changeProject = (num) => {    
    //CHANGE PROJECT
    this.props.dispatch(handleProjectToggle(num))
    this.setState({show: false})
}

  render() {

    let projectList = this.props.projectList
    let fullProjList = []
    projectList.forEach((item)=>{fullProjList.push(item.projTitle)})

    let projectListAr = []
    let self = this
    //on initial render, projectList is undefined, so set a error capture to set to an empty array
    if (projectList === undefined) {
      projectList = []
    } else {
      projectList
      .filter(item => !this.state.inputFilter || item.projTitle.toLowerCase().includes(this.state.inputFilter.toLowerCase()))
        .forEach((item, index)=>{
          let locationInFull = fullProjList.indexOf(item.projTitle)
          projectListAr.push(
            <MenuItem eventKey={index} key={index} onSelect={()=>self.changeProject(locationInFull)}>{item.projTitle}</MenuItem>
          )
        })
    }
    
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

