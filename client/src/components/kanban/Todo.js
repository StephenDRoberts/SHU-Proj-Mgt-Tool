import React from 'react';
import Ticket from './Ticket.js';

let todoTicketsAr = [];

class Todo extends React.Component {
    render() {
        //on initial render, this.props = undefined or is set to be an empty array, so error checked for these values
        if (this.props===undefined || this.props.length===0 ){
        
        //else we pass the todoTickets from props into the Ticket component for rendering
        } else {
        
            todoTicketsAr = this.props.tasks.map(function (obj, i) {
                return <Ticket key={i} data={obj}></Ticket>
            })
        }

        return (
            <div>
                <h2>To do:</h2>
                {todoTicketsAr}

            </div>
        )
    }


}
export default Todo