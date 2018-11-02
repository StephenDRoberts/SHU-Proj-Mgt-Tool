import React from 'react';
import {connect} from 'react-redux'
import {handleEditTicket} from '../../redux/modules/dataReducer.js' 
import Ticket from './Ticket.js';

let doneTicketsAr = [];

class Done extends React.Component {

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        // finds the location of the ticket in the project array
        let ticketNum = ev.dataTransfer.getData('ticketNum')
        let projNumber = this.props.projNumber
        
        // sets up our data to edit. only change is the status to match the dropped category
        let data = {
            title: this.props.data[0].projects[projNumber].tasks[ticketNum].title,
            description: this.props.data[0].projects[projNumber].tasks[ticketNum].description,
            hours: parseInt(this.props.data[0].projects[projNumber].tasks[ticketNum].hours, 10),
            status: cat,
            type: this.props.data[0].projects[projNumber].tasks[ticketNum].type,
        }
        // dispatches to redux store to edit ticket and re-render application
        this.props.dispatch(handleEditTicket(data, ticketNum, projNumber))
    }

    render() {
        //on initial render, this.props = undefined or is set to be an empty array, so error checked for these values
        if (this.props === undefined || this.props.length === 0) {

            //else we pass the todoTickets from props into the Ticket component for rendering
        } else {

            doneTicketsAr = this.props.tasks.map(function (obj, i) {
                return <Ticket key={i} dataset={obj}></Ticket>
            })
        }

        return (
            <div className="droppable" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, 'Done')}>
                <h2>Done:</h2>
                {doneTicketsAr}

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

export default connect(mapStateToProps)(Done)
