import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {connect} from 'react-redux'
import {handleDeleteTicket, addTicketFinished} from '../../redux/modules/dataReducer.js'

class Ticket extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            show: false,
        
        };
    }

    handleDelete(){
        let projNumber = this.props.projNumber
        let ticketNum = this.findLocation()
        this.props.dispatch(handleDeleteTicket(ticketNum, projNumber))
        this.setState({ show: false });
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    findLocation(){
        let projNumber = this.props.projNumber
        let fullDataAr = this.props.data[0].projects[projNumber].tasks
        let titleAr = []
        fullDataAr.map(function(obj){
            titleAr.push(obj['title'])
        })
        
        return titleAr.findIndex(title=>title===this.props.dataset["title"])
    }

    render() {
       //This is to make css stylings ok - will change when change 'Type' names
       let trimmedType = this.props.dataset.type.replace(/\s+/g,'')
        
        return (
            <div className='tickets'>
                <Button className='openTicket' onClick={this.handleShow}>
                    <div className={trimmedType}>{this.props.dataset.title}</div>
                    <p className='estHours'>Est hours: {this.props.dataset.estHours} hrs</p>
                    <p className='taskType'>{this.props.dataset.type}</p>
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Ticket name</h4>
                        <input id='titleEdit' value={this.props.dataset.title}></input>

                        <hr />

                        <h4>Description</h4>
                        <textarea rows="4" id='descEdit' value={this.props.dataset.description}></textarea>

                        <hr />

                        <h4>Estimated Hours</h4>
                        <input id='estHoursEdit' value={this.props.dataset.estHours}></input>

                        <hr />

                        <h4>Type</h4>
                        <input id='typeEdit' value={this.props.dataset.type}></input>

                        <hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} bsStyle="primary">Submit</Button>
                        <Button key = {this.props.key} onClick={this.handleDelete} bsStyle="danger">Delete</Button>
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
  
  export default connect(mapStateToProps)(Ticket)