import React from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, Button, Modal } from 'react-bootstrap';
import { handleAddProject, handleDeleteProject } from '../../redux/modules/dataReducer.js';
import { handleProjectToggle } from '../../redux/modules/changeProject.js'

class ProjectDropdown extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddClose = this.handleAddClose.bind(this)
        this.handleDeleteClose = this.handleDeleteClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.changeProject = this.changeProject.bind(this)

        this.state = {
            deleteShow: false,
            addShow: false,
            addProjName: ''
        }

    }



    changeProject = (num) => {
        //100 code = Add Project, 101 code = Delete project.
        //Otherwise all other numbers below 100 are individual projects
        if (num == 100) {
            //ADD PROJECT
            this.setState({ addShow: true, })
        } else if (num == 101) {
            //DELETE PROJECT
            this.setState({ deleteShow: true })
        } else {
            //CHANGE PROJECT
            this.props.dispatch(handleProjectToggle(num))
        }
    }
    handleAdd() {
         this.props.dispatch(handleAddProject(document.getElementById('addProjInput').value))
         this.props.dispatch(handleProjectToggle(this.props.projectList.length-1))
        this.setState({
            addShow: false,
        })
    }


    handleDelete() {
        this.props.dispatch(handleDeleteProject(this.props.projNumber))
        this.props.dispatch(handleProjectToggle(0))
        this.setState({ deleteShow: false })
    }
    handleAddClose() {
        this.setState({ addShow: false })
    }
    handleDeleteClose() {
        this.setState({ deleteShow: false })
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

                {/* Add project modal */}
                <Modal show={this.state.addShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>What would you like to name your project?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input id='addProjInput'></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button key={this.props.key} onClick={this.handleAdd} bsStyle="primary">Add Project</Button>
                        <Button onClick={this.handleAddClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete project modal */}
                <Modal show={this.state.deleteShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button key={this.props.key} onClick={this.handleDelete} bsStyle="danger">Delete</Button>
                        <Button onClick={this.handleDeleteClose}>Close</Button>
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
export default connect(mapStateToProps)(ProjectDropdown)
