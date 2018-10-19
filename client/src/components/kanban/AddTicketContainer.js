import React, { Component } from 'react';
import {Provider, connect, dispatch} from 'react-redux'
import {reducer, store} from '../../redux/store.js'
import AddTicket from './AddTicket.js'
import {addTicket} from '../../redux/modules/tickets.js'

// addTicket=(ticket)=>{
// this.props.reducer(ticket)
// }

// handleAddTicket(data){
//     let allData = this.state.data
//     let projLocation = this.state.projLocation
//     allData.projects[projLocation].tasks.push(data)
    
//     this.setState({data: allData})
    
//   }

const mapStateToProps = (state)=>{
    return{tasks: state}
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addTicket: (ticket)=>{
            dispatch(addTicket(ticket))
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)
(AddTicket)

class AddTicketContainer extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <Container/>
            </Provider>
        )
    }
}
export default AddTicketContainer