import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class AddTicket extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

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

  render() {
    return (
      <div className='addTicket'>
        <Button className='addSign'bsStyle="success" onClick={this.handleShow}>
          +
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

            <h4>Type</h4>
            <input id='typeInput'></input>

            <hr />
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={this.handleClose} bsStyle="primary">Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }


}
export default AddTicket