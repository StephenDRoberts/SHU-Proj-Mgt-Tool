import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleEditTicket, handleDeleteTicket, addTicketFinished } from '../../redux/modules/dataReducer.js'

class Ticket extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.myRef = React.createRef();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDoneClose = this.handleDoneClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.state = {
            title: '',
            description: '',
            hours: 0,
            status: '',
            type: '',
            show: false,
            doneShow: false
        };
    }

    handleDelete() {
        let projNumber = this.props.projNumber
        let ticketNum = this.findLocation()
        this.props.dispatch(handleDeleteTicket(ticketNum, projNumber))
        this.setState({ show: false });
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleDoneClose() {
        this.setState({ doneShow: false });
    }
    handleShow() {

        this.setState({
            title: this.props.dataset.title,
            description: this.props.dataset.description,
            hours: parseInt(this.props.dataset.hours, 10),
            status: this.props.dataset.status,
            type: this.props.dataset.type,
            show: true
        });
    }

    handleChange(e) {
        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let hours = parseInt(document.getElementById('hoursEdit').value, 10)
        let type = document.getElementById('typeEdit').value


        this.setState({
            title: title,
            description: description,
            hours: parseInt(hours, 10),
            type: type,
        })


    }
    //help on general edit handler: 
    handleEdit() {

        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let hours = parseInt(document.getElementById('hoursEdit').value, 10)
        let status = document.getElementById('statusEdit').value
        let type = document.getElementById('typeEdit').value

        let data = {
            "title": title,
            "description": description,
            "hours": hours,
            "status": status,
            "type": type,
            "priority": 1
        }

        let projNumber = this.props.projNumber
        let ticketNum = this.findLocation()
        this.props.dispatch(handleEditTicket(data, ticketNum, projNumber))
        this.props.dispatch(addTicketFinished())

        this.setState({ show: false });
    }


    changeStatus(ev) {
        if (ev.target.value == 'Done') {
            this.setState({ doneShow: true })
        }
    }
    // finds the location of the ticket in the specific project array 
    findLocation() {
        let projNumber = this.props.projNumber
        let fullDataAr = this.props.data[0].projects[projNumber].tasks
        let titleAr = []
        fullDataAr.map(function (obj) {
            titleAr.push(obj['title'])
        })

        return titleAr.findIndex(title => title === this.props.dataset["title"])
    }

    // DRAG AND DROP FUNCTIONALITY:
    // https://www.youtube.com/watch?v=FdDpyD4EMrA
    onDragStart = (ev) => {
        let ticketNum = this.findLocation()
        ev.dataTransfer.setData('ticketNum', ticketNum)
    }

    // onDrop=(ev, cat)=>{
    //     let id = ev.dataTransfer.getData('id')
    //     console.log('ive been dropped')

    // }
    componentDidMount(){
        this.setState({
            title: this.props.dataset.title,
            description: this.props.dataset.description,
            hours: parseInt(this.props.dataset.hours, 10),
            status: this.props.dataset.status,
            type: this.props.dataset.type,
        });
    }

    render() {
        console.log(this.state.status=="Doing")
        //This is to make css stylings ok - will change when change 'Type' names
        let trimmedType = this.props.dataset.type.replace(/\s+/g, '')
        return (
            <div className='tickets'>
                <Button draggable id="ticketDrag" className='openTicket' onClick={this.handleShow}
                    onDragStart={(e) => this.onDragStart(e)}>

                    <div className={trimmedType}>{this.props.dataset.title}</div>
                    <p className='hours'>Hours: {this.props.dataset.hours} hrs</p>
                    <p className='taskType'>{this.props.dataset.type}</p>
                </Button>

                {/* EDIT TICKET MODAL */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Ticket name</h4>
                        <input id='titleEdit' onChange={this.handleChange} value={this.state.title}></input>

                        <hr />

                        <h4>Description</h4>
                        <textarea rows="4" onChange={this.handleChange} id='descEdit' value={this.state.description}></textarea>

                        <hr />

                        <h4>Estimated/Actual Hours</h4>
                        <input type="number" id='hoursEdit' onChange={this.handleChange} value={this.state.hours}></input>

                        <hr />
                        {/* defaultValue={this.state.type} */}
                        <h4 value="Status">Status</h4>
                        <select id="statusEdit" onChange={this.changeStatus} defaultValue={this.state.status}>
                            <option id="ToDo" value="To-Do">To-Do</option>
                            <option id="Doing" value="Doing">Doing</option>
                            <option id="Done" value="Done">Done</option>
                        </select>

                        <hr />

                        <h4>Type</h4>
                        <input id='typeEdit' onChange={this.handleChange} defaultValue={this.state.type}></input>

                        <hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleEdit} bsStyle="primary">Submit</Button>
                        <Button key={this.props.key} onClick={this.handleDelete} bsStyle="danger">Delete</Button>
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

export default connect(mapStateToProps)(Ticket)