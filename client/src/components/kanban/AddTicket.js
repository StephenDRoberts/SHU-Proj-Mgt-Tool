import React from 'react';
import {connect} from 'react-redux'
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import {handleAddTicket, addTicketFinished} from '../../redux/modules/dataReducer.js'

class AddTicket extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddTicket = this.handleAddTicket.bind(this);
    

    this.state = {
      show: false
    };
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleAddTicket(){
  
let title = document.getElementById('titleInput').value
let description = document.getElementById('descInput').value
let estHours = document.getElementById('estHoursInput').value
let actHours = '';
let status = document.getElementById('status').value
let type = document.getElementById('typeInput').value
let priority = 2

let data = {
  "title": title,
  "description": description,
  "estHours": estHours,
  "actHours": actHours,
  "status": status,
  "type": type,
  "priority": priority,
}
    // this.props.addTicket(data)
    this.setState({show: false})
    let projNumber = this.props.projNumber
    this.props.dispatch(handleAddTicket(data, projNumber))
    this.props.dispatch(addTicketFinished())
  }


  render() {
    let data = this.props.data
    let activeProject = this.props.projNumber
    let activeTasks = [];
    
    
    if(data===undefined || data.length===0){
      data = [{
        id: '',
        user: '',
        projects: []
      }]
    } else {
      data = data[0]
      activeTasks = data.projects[activeProject].tasks
    }
    
    
    return (
      <div className='addTicket'>
        <Button className='addSign'bsStyle="success" onClick={this.handleShow}>
        <Glyphicon className="glyphicon glyphicon-plus" glyph=""/>
                </Button>
                
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Ticket name</h4>
            <input id ='titleInput'></input>

            <hr />

            <h4>Description</h4>
            <input id='descInput'></input>

            <hr />

            <h4>Estimated Hours</h4>
            <input id='estHoursInput'></input>

            <hr />

            <h4>Status</h4>
            <select id="status">
              <option value="To-Do">To-Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>

            <hr />

            <h4>Type</h4>
            <input id='typeInput'></input>

            <hr />
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={this.handleAddTicket} bsStyle="primary">Submit</Button>
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

export default connect(mapStateToProps)(AddTicket)

