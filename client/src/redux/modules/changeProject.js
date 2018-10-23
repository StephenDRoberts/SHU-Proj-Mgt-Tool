
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
    let changeProjState = [...state]
    switch(action.type){
        case CHANGE:
             return {
                changeProjState,
                projNumber: action.projNumber}

        default:
             return state;
    }

}