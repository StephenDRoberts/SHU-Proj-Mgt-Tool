import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleEditTicket, handleDeleteTicket, addTicketFinished, handleChangeStyle } from '../../redux/modules/dataReducer.js'
import { SliderPicker } from 'react-color'


class Ticket extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDoneClose = this.handleDoneClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);

        this.state = {
            title: '',
            description: '',
            hours: 0,
            status: '',
            type: '',
            trimmedType: '',
            show: false,
            doneShow: false,
            styles: [{ 'backgroundColor': '#ffffff' }],
            input: ''
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
            trimmedType: this.props.dataset.trimmedType,
            show: true
        });
    }

    handleChange(event) {
        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let hours = parseInt(document.getElementById('hoursEdit').value, 10)
        let type = document.getElementById('typeEdit').value
        let trimmedType = type.replace(/\s+/g, '')

        this.setState({
            title: title,
            description: description,
            hours: parseInt(hours, 10),
            type: type,
            trimmedType: trimmedType
        })

        this.setState({
            input: event.target.value
        });
        // Checks to see if Type has already been entered before and picks up that color
        let trimmedInput = event.target.value.replace(/\s+/g, '')
        if (this.props.data[0].styles[trimmedInput] !== undefined) {
            this.setState({ styles: this.props.data[0].styles[trimmedInput] })
        }

    }
    //help on general edit handler: 
    handleEdit() {
        
        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let hours = parseInt(document.getElementById('hoursEdit').value, 10)
        let status = document.getElementById('statusEdit').value
        let type = document.getElementById('typeEdit').value
        // trimmedType used to make sure that if user inputs a space in their type name 
        // that the style will still come through
        let trimmedType = type.replace(/\s+/g, '')
        
        //Validation check - need a title for kanban UI
        //NB, we've not required a description as that can be optional.
        if(title===''){
            alert("Please specify a title for your ticket.");
            return;
        }
        //Validation check - hours must be a number
       if(isNaN(hours)){
            alert("Hours must be in whole number format.\nIf you'd like to sepcify 0 hours, please enter 0.")
            return;
        }

        //Validation check - need a type otherwise type colours wont work.
        if(trimmedType === ''){
            alert("Please enter a type name");
            return;
        }

        let data = {
            "title": title,
            "description": description,
            "hours": hours,
            "status": status,
            "type": type,
            "trimmedType": trimmedType,
            "priority": 1
        }

        let projNumber = this.props.projNumber
        let ticketNum = this.findLocation()
        this.props.dispatch(handleEditTicket(data, ticketNum, projNumber))
        this.props.dispatch(addTicketFinished())

        this.props.dispatch(handleChangeStyle(trimmedType, this.state.styles[0].backgroundColor))
        // console.log(this.onChangeColor())
        this.setState({ show: false });
    }


    changeStatus(ev) {
        if (ev.target.value === 'Done') {
            this.setState({ doneShow: true })
        }
    }
    // finds the location of the ticket in the specific project array 
    findLocation() {
        let projNumber = this.props.projNumber
        let fullDataAr = this.props.data[0].projects[projNumber].tasks
        let titleAr = []
        fullDataAr.map(function (obj) {
            return titleAr.push(obj['title'])
        })

        return titleAr.findIndex(title => title === this.props.dataset["title"])
    }

    // DRAG AND DROP FUNCTIONALITY:
    // https://www.youtube.com/watch?v=FdDpyD4EMrA
    onDragStart = (ev) => {
        let ticketNum = this.findLocation()
        ev.dataTransfer.setData('ticketNum', ticketNum)
    }


    onChangeColor = (color) => {

        let styles = [{ "backgroundColor": color.hex }]
        this.setState({ styles: styles })
        // this.props.dispatch(handleChangeStyle(color.hex))
    }

    getContrastYIQ(hexcolor) {

        var r = parseInt(hexcolor.substr(1, 2), 16);
        var g = parseInt(hexcolor.substr(3, 2), 16);
        var b = parseInt(hexcolor.substr(5, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? { backgroundColor: hexcolor, color: 'black' } : { backgroundColor: hexcolor, color: 'white' };

    }

    componentDidMount() {
        this.setState({
            title: this.props.dataset.title,
            description: this.props.dataset.description,
            hours: parseInt(this.props.dataset.hours, 10),
            status: this.props.dataset.status,
            type: this.props.dataset.type,
            trimmedType: this.props.dataset.trimmedType,
            styles: this.props.data[0].styles[this.props.dataset.trimmedType]
        });
    }

    render() {
        // Defines styles for each ticket - couldnt do in componentDidMount
        // as changing project number didn't create a compDiDMount call.
        // Possible mutability issue with changeProj reducer???
        let styles = this.getContrastYIQ(this.props.data[0].styles[this.props.dataset.trimmedType][0].backgroundColor)

        //This is to make css stylings ok - will change when change 'Type' names
        let trimmedType = this.props.dataset.type.replace(/\s+/g, '')
        return (
            <div className='tickets'>
                <Button draggable id="ticketDrag" className='openTicket' onClick={this.handleShow}
                    onDragStart={(e) => this.onDragStart(e)} data={this.state.projNumber}>

                    <div className={trimmedType} style={styles}>{this.props.dataset.title}</div>
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

                        <SliderPicker color={this.state.styles[0].backgroundColor} onChangeComplete={this.onChangeColor} />
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