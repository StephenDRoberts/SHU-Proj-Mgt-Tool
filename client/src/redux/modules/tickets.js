
// ACTION TYPE CONSTANTS
export const ADD = 'ADD'
export const DELETE = 'DELETE'

// ACTION CREATORS
export const deleteTicket=()=>{
    return{
        type: DELETE
    }
}

export const addTicket=(ticket)=>{
    return{
        type: ADD,
        ticket: ticket 
    }
}

// REDUCER
const defaultState = {}

export const ticketReducer=(state=defaultState, action)=>{
    switch(action.type){
        case DELETE:
             let deleteState = state
             return deleteState
             
        case ADD:
            let addState = state
            console.log(state)
            return addState
            //.concat(action.ticket)
        default:
             return state;
    }

}