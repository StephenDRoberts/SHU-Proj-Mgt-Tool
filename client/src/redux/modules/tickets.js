
// ACTION TYPE CONSTANTS
export const ADD = 'ADD'
export const DELETE = 'DELETE'
export const FINISHED = 'FINISHED'

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

export const finished=()=>{
    return{
        type: FINISHED
    }
}

export function handleAddTicket(data){
    return dispatch => dispatch(addTicket(data))
}
export function addTicketFinished(){
    return dispatch => dispatch(finished())
}

// REDUCER
const defaultState = []

export const ticketReducer=(state=defaultState, action)=>{
    switch(action.type){
        case DELETE:
             let deleteState = state
             return deleteState
             
        case ADD:
        return {...state,
            data: state.concat(action.ticket)}

        case FINISHED:
        return state
    
        default:
            return state;
    }

}