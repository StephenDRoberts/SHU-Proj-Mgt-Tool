import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import { handleAddTicket, addTicketFinished, handleChangeStyle } from '../../redux/modules/dataReducer.js'
import { SliderPicker } from 'react-color'

class AddTicket extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddTicket = this.handleAddTicket.bind(this);
    this.handleChange = this.handleChange.bind(this)
    
    this.state = {
      show: false,
      typeColor: '000000',
      styles: [{'backgroundColor':'#ffffff'}],
      input: ''
    };
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleAddTicket() {

    let title = document.getElementById('titleInput').value
    let description = document.getElementById('descInput').value
    let hours = parseInt(document.getElementById('hoursInput').value, 10)
    let status = document.getElementById('status').value
    let type = document.getElementById('typeInput').value
    // trimmedType used to make sure that if user inputs a space in their type name 
    // that the style will still come through 
    let trimmedType = type.replace(/\s+/g, '')
    
    let priority = 2

    let data = {
      "title": title,
      "description": description,
      "hours": parseInt(hours, 10),
      "status": status,
      "type": type,
      "trimmedType": trimmedType,
      "priority": priority,
    }
    
    this.setState({ 
      show: false,
      input : ''    
    })

    let projNumber = this.props.projNumber
    this.props.dispatch(handleAddTicket(data, projNumber))
    this.props.dispatch(addTicketFinished())
    
    this.props.dispatch(handleChangeStyle(trimmedType, this.state.styles[0].backgroundColor))

  }
  onChangeColor = (color) => {
        
    let styles = [{"backgroundColor":color.hex}]
    this.setState({ styles:styles})
 
}
handleChange(event) {
  this.setState({
    input: event.target.value
  });
  // Checks to see if Type has already been entered before and picks up that color
  let trimmedInput = event.target.value.replace(/\s+/g, '')
  if(this.props.data[0].styles[trimmedInput]!==undefined){
    this.setState({styles: this.props.data[0].styles[trimmedInput]})
  }
  
}

  render() {
    let data = this.props.data
    let activeProject = this.props.projNumber
    let activeTasks = [];


    if (data === undefined || data.length === 0) {
      data = [{
        id: '',
        user: '',
        projects: []
      }]
    } else if (data[0].projects.length == 0) {

      data = data[0]
      activeTasks = []
    } else {
      data = data[0]
      activeTasks = data.projects[activeProject].tasks
    }

    let typeStyle = {
      color: this.state.typeColor
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
            <input id='descInput'></input>

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

