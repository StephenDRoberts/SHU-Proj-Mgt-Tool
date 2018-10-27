
// ACTION TYPE CONSTANTS
const SIGNUP = 'SIGNUP'
const LOGGEDIN = 'LOGGEDIN'
const LOGGEDOUT = 'LOGGEDOUT'

// ACTION CREATORS
export const signup=()=>{
    return{
        type: SIGNUP,
        
    }
}
                
export function handleSignup(){
    return dispatch => dispatch(signup())
}
// export function handleLogin(user, pass){
//     return dispatch => dispatch(login(user, pass))
// }
// export function handleLogout(){
//     return dispatch => dispatch(logout())
// }
// export function handleDeleteAccount(){
//     return dispatch => dispatch(deleteAccount())
// }


// REDUCER
const defaultState = {
    signedUp: false,
    loggedIn: false
}

export const loginReducer=(state=defaultState, action)=>{
    let accountState = [...state]
    switch(action.type){
        case SIGNUP:
             return {
                accountState,
                signedUp: true
            }

        default:
             return state;
    }

}