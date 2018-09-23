import React, { Component } from 'react';

class Ticket extends React.Component {


    render() {
        return (
            <div className='tickets'>
                <h4 className='ticketTitle'>{this.props.data.title}</h4>
                <p className='estHours'>Est hours: {this.props.data.estHours} hrs</p>
                <p className='taskType'>{this.props.data.type}</p>
            </div>
        )
    }


}
export default Ticket