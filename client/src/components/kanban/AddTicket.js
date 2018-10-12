import React from 'react';
import { Button, Modal, Glyphicon } from 'react-bootstrap';

class AddTicket extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

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

  handleAdd(){
    
    
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
  "priority": priority
}
    this.props.addTicket(data)
    this.setState({show: false})
  }


  render() {
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
          <Button onClick={this.handleAdd} bsStyle="primary">Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }


}
export default AddTicket