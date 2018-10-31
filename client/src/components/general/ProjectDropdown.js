import React from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, Button, Modal } from 'react-bootstrap';
import { handleAddProject, handleDeleteProject } from '../../redux/modules/dataReducer.js';
import { handleProjectToggle } from '../../redux/modules/changeProject.js'

class ProjectDropdown extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()

        this.handleAddClose = this.handleAddClose.bind(this)
        this.handleShareClose = this.handleShareClose.bind(this)
        this.handleDeleteClose = this.handleDeleteClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.changeProject = this.changeProject.bind(this)

        this.state = {
            addShow: false,
            shareShow: false,
            deleteShow: false,
            addProjName: '',
            deleteProjShow: true
        }

    }



    changeProject = (num) => {
        //100 code = Add Project, 101 code = Delete project.
        //Otherwise all other numbers below 100 are individual projects
        if (num == 100) {
            //ADD PROJECT
            this.setState({ addShow: true, })
        } else if (num == 101) {
            //SHARE PROJECT
            this.setState({ shareShow: true })

        } else if (num == 102) {
            //DELETE PROJECT
            this.setState({ deleteShow: true })
        } else {
            //CHANGE PROJECT
            this.props.dispatch(handleProjectToggle(num))
        }
    }
    handleAdd() {
        this.props.dispatch(handleAddProject(document.getElementById('addProjInput').value))
        this.props.dispatch(handleProjectToggle(this.props.projectList.length - 1))
        this.setState({
            addShow: false,
        })
    }

    handleShare() {
        //first check to see if the user entered is a valid user
        let targetUser = document.getElementById('shareProjInput').value
        
        let self = this
        let endpoint = '/api/shareCheck'

        fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({
                user: targetUser,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json()
            }
            alert("Something went wrong. Please try again.");
            // self.setState({shareShow: false})
            return [];

        }).then(function (myJson) {
            console.log(myJson)
            if (myJson.length !== 0) {
                //successfully found user
                console.log(myJson)
            } else {
                alert("I'm sorry, we couldn't find that user. Please try again.")
            }
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
    handleShareClose() {
        this.setState({ shareShow: false })
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

            if (projectList.length == 0 && this.myRef.current !== null) {
                this.myRef.current.disabled = true;
            }
        }

        return (
            <div id='projectDropdown'>
                <DropdownButton title='Project' pullRight id='projdropdown'>
                    {projectListAr}
                    <MenuItem divider />
                    <MenuItem eventKey="100" onSelect={self.changeProject}>Add Project</MenuItem>
                    <MenuItem eventKey="101" onSelect={self.changeProject}>Share Project</MenuItem>
                    <MenuItem eventKey="102" onSelect={self.changeProject} ref={this.myRef}>Delete Project</MenuItem>
                </DropdownButton>

                {/* Add project modal */}
                <Modal show={this.state.addShow} onHide={this.handleAddClose}>
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

                {/* Share project modal */}
                <Modal show={this.state.shareShow} onHide={this.handleShareClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Who would you like to share your project with?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input id='shareProjInput' placeholder="Username"></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button key={this.props.key} onClick={this.handleShare} bsStyle="primary">Share Project</Button>
                        <Button onClick={this.handleShareClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete project modal */}
                <Modal show={this.state.deleteShow} onHide={this.handleDeleteClose}>
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
