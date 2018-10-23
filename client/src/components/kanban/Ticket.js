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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            title: '',
            description: '',
            estHours: 0,
            actHours: 0,
            status: '',
            type: '',
            show: false,

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

    handleShow() {
       
        this.setState({
            title: this.props.dataset.title,
            description: this.props.dataset.description,
            estHours: parseInt(this.props.dataset.estHours,10),
            status: this.props.dataset.status,
            type: this.props.dataset.type,
            show: true
        }); 
    }
    
    handleChange(e) {
        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let estHours = parseInt(document.getElementById('estHoursEdit').value,10)
        let type = document.getElementById('typeEdit').value


        this.setState({
            title: title,
            description: description,
            estHours: parseInt(estHours,10),
            // actHours: actHours,
            // status: status,
            type: type,
            // priority: priority,
        })


    }
    //help on general edit handler: 
    handleEdit() {

        let title = document.getElementById('titleEdit').value
        let description = document.getElementById('descEdit').value
        let estHours = parseInt(document.getElementById('estHoursEdit').value,10)
        let status = document.getElementById('statusEdit').value
        let type = document.getElementById('typeEdit').value

        let data = {
            "title": title,
            "description": description,
            "estHours": estHours,
            "actHours": '',
            "status": status,
            "type": type,
            "priority": 1
        }

        let projNumber = this.props.projNumber
        console.log(projNumber)
        let ticketNum = this.findLocation()
        this.props.dispatch(handleEditTicket(data, ticketNum, projNumber))
        this.props.dispatch(addTicketFinished())

        this.setState({ show: false });

    }



    findLocation() {
        let projNumber = this.props.projNumber
        let fullDataAr = this.props.data[0].projects[projNumber].tasks
        let titleAr = []
        fullDataAr.map(function (obj) {
            titleAr.push(obj['title'])
        })

        return titleAr.findIndex(title => title === this.props.dataset["title"])
    }


    componentDidMount() {
        
       
        // console.log(document.getElementById('To-Do').value)
        
        // if (document.getElementById('ToDo') !== null) {

        //     let selectedStatus = this.props.dataset.status
        //     console.log(selectedStatus==='To-Do')
        //     switch (selectedStatus) {
        //         case 'To-Do':
        //             console.log('to-do')
        //             document.getElementById('ToDo').selected = true
        //             break;
        //         case 'Doing':
        //         console.log('doing')
        //             document.getElementById('Doing').selected = true
        //             break;
        //         case 'Done':
        //         console.log('done')
        //             document.getElementById('Done').selected = true
        //             break;
        //         default:
        //         console.log('error')
        //             document.getElementById('To-Do').selected = true
        //             break;
        //     }
        // }
    }
    render() {
        //This is to make css stylings ok - will change when change 'Type' names
        let trimmedType = this.props.dataset.type.replace(/\s+/g, '')
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
                        <input id='titleEdit' onChange={this.handleChange} value={this.state.title}></input>

                        <hr />

                        <h4>Description</h4>
                        <textarea rows="4" onChange={this.handleChange} id='descEdit' value={this.state.description}></textarea>

                        <hr />

                        <h4>Estimated Hours</h4>
                        <input type="number" id='estHoursEdit' onChange={this.handleChange} value={this.state.estHours}></input>

                        <hr />

                        <h4 value="Status">Status</h4>
                        <select id="statusEdit">
                            <option id="ToDo" value="To-Do">To-Do</option>
                            <option id="Doing" value="Doing">Doing</option>
                            <option id="Done" value="Done">Done</option>
                        </select>

                        <hr />

                        <h4>Type</h4>
                        <input id='typeEdit' onChange={this.handleChange} value={this.state.type}></input>

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