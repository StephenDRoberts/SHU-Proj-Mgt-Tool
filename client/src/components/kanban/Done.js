import React from 'react';
import Ticket from './Ticket.js'; 

let doneTicketsAr = [];

class Done extends React.Component {
render(){
     //on initial render, this.props = undefined or is set to be an empty array, so error checked for these values
     if (this.props===undefined || this.props.length===0 ){
        
        //else we pass the todoTickets from props into the Ticket component for rendering
        } else {
        
            doneTicketsAr = this.props.tasks.map(function (obj, i) {
                return <Ticket key={i} dataset={obj}></Ticket>
            })
        }

    return (
    <div>
        <h2>Done:</h2>
        {doneTicketsAr}
       
    </div>
    )
}


}
export default Done
