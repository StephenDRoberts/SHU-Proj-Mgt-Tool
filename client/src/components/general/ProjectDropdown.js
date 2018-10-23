import React from 'react';
import {connect} from 'react-redux';
import { DropdownButton, MenuItem, Button, Modal } from 'react-bootstrap';
import {handleDeleteProject} from '../../redux/modules/dataReducer.js';
import {handleProjectToggle} from '../../redux/modules/changeProject.js'

class ProjectDropdown extends React.Component {

    constructor(props){
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.changeProject = this.changeProject.bind(this)

        this.state = {
            show: false
        }
    
    }
    
    

    changeProject = (num) => {
        console.log(num)
        //100 code = Add Project, 101 code = Delete project.
        //Otherwise all other numbers below 100 are individual projects
        if (num == 100) {
            console.log('add project')
        } else if (num == 101) {
            this.setState({show: true})
        } else {
            this.props.dispatch(handleProjectToggle(num))
        }
    }
    handleDelete(){
        this.props.dispatch(handleDeleteProject(this.props.projNumber))
        this.props.dispatch(handleProjectToggle(0))
        this.setState({show:false})
    }
    handleClose(){
        this.setState({show: false})
    }

    render() {


        //receives project list from App.js prop
        let projectList = this.props.projectList
        let projectListAr = []
        let self = this
        //on initial render, projectList is undefined, so set a error capture to set to an empty array
        if (projectList === undefined) {
            projectList = []
        } else {
            projectListAr = projectList.map(function (obj, i) {
                return <MenuItem eventKey={i} key={i} onSelect={self.changeProject}>{obj.projTitle}</MenuItem>
            })
        }

        return (
            <div id='projectDropdown'>
                <DropdownButton title='Project' pullRight id='projdropdown'>
                    {projectListAr}
                    <MenuItem divider />
                    <MenuItem eventKey="100" onSelect={self.changeProject}>Add Project</MenuItem>
                    <MenuItem eventKey="101" onSelect={self.changeProject}>Delete Project</MenuItem>
                </DropdownButton>
           

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button key={this.props.key} onClick={this.handleDelete} bsStyle="danger">Delete</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
           
           
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
      data: state.dataReducer.data,
      projNumber: state.changeProjectReducer.projNumber
    }
  }
  export default connect(mapStateToProps)(ProjectDropdown)
