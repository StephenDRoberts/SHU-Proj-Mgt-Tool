import produce from 'immer';

// ACTION TYPE CONSTANTS
export const CHANGE = 'CHANGE'

// ACTION CREATORS
export const changeProject=(num)=>{
    return{
        type: CHANGE,
        projNumber: num
    }
}
                
export function handleProjectToggle(num){
    return dispatch => dispatch(changeProject(num))
}


// REDUCER
const defaultState = {
    projNumber : 0
}

export const changeProjectReducer=(state=defaultState, action)=>{
    
    let newState = produce(state, draftState => {
      draftState.projNumber = action.projNumber
      
    })
    
    switch(action.type){
        case CHANGE:
             return newState

        default:
             return state;
    }

}