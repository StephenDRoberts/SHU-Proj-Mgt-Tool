import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import { handleAddTicket, addTicketFinished, handleChangeStyle } from '../../redux/modules/dataReducer.js'
import { SliderPicker } from 'react-color'

class AddTicket extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      typeColor: '000000',
      styles: [{ 'backgroundColor': '#ffffff' }],
      input: ''
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleAddTicket = () => {

    let title = document.getElementById('titleInput').value
    let description = document.getElementById('descInput').value
    let hours = parseInt(document.getElementById('hoursInput').value, 10)
    let status = document.getElementById('status').value
    let type = document.getElementById('typeInput').value
    // trimmedType used to make sure that if user inputs a space in their type name 
    // that the style will still come through 
    let trimmedType = type.replace(/\s+/g, '')

    //Validation check - need a title for kanban UI
    //NB, we've not required a description as that can be optional.
    if (title === '') {
      alert("Please specify a title for your ticket.");
      return;
    }
    //Validation check - hours must be a number
    if (isNaN(hours)) {
      alert("Hours must be in whole number format.\nIf you'd like to sepcify 0 hours, please enter 0.")
      return;
    }

    //Validation check - need a type otherwise type colours wont work.
    if (trimmedType === '') {
      alert("Please enter a type name");
      return;
    }

    let data = {
      "title": title,
      "description": description,
      "hours": parseInt(hours, 10),
      "status": status,
      "type": type,
      "trimmedType": trimmedType,
    }

    this.setState({
      show: false,
      input: ''
    })

    let projNumber = this.props.projNumber

    // sends data to redux store (adding extra ticket to data and updating styles)
    this.props.dispatch(handleAddTicket(data, projNumber))
    this.props.dispatch(addTicketFinished())
    this.props.dispatch(handleChangeStyle(trimmedType, this.state.styles[0].backgroundColor))
  }

  //on changing of type colour
  onChangeColor = (color) => {
    let styles = [{ "backgroundColor": color.hex }]
    this.setState({ styles: styles })
  }

  // handles the type input so that we can find the current colour already set for that type (if matched)
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });

    // Checks to see if Type has already been entered before and picks up that color
    let trimmedInput = event.target.value.replace(/\s+/g, '')
    if (this.props.data[0].styles[trimmedInput] !== undefined) {
      this.setState({ styles: this.props.data[0].styles[trimmedInput] })
    }
  }

  render() {
    let data = this.props.data

    if (data === undefined || data.length === 0) {
      data = [{
        id: '',
        user: '',
        projects: []

      }]
    } else if (data[0].projects.length === 0) {
      data = data[0]
    } else {
      data = data[0]
    }
    return (

      <div className='addTicket'>
        <Button className='addSign' bsStyle="success" onClick={this.handleShow}>
          <Glyphicon className="glyphicon glyphicon-plus" glyph="" />
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Ticket name</h4>
            <input id='titleInput'></input>

            <hr />

            <h4>Description</h4>
            <textarea id='descInput'></textarea>

            <hr />

            <h4>Estimated/Actual Hours</h4>
            <input type="number" id='hoursInput'></input>

            <hr />

            <h4>Status</h4>
            <select id="status">
              <option value="To-Do">To-Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>

            <hr />

            <h4>Type</h4>
            <input id='typeInput' onChange={this.handleChange}></input>


            <hr />

            <SliderPicker color={this.state.styles[0].backgroundColor} onChangeComplete={this.onChangeColor} />


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

const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
    projNumber: state.changeProjectReducer.projNumber
  }
}

export default connect(mapStateToProps)(AddTicket)

