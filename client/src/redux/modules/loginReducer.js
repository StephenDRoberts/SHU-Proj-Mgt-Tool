
// ACTION TYPE CONSTANTS
const SIGNUP = 'SIGNUP'
const LOGIN = 'LOGIN'
const LOGGEDOUT = 'LOGGEDOUT'

// ACTION CREATORS
const signup = () => {
    return {
        type: SIGNUP,

    }
}
const login = (user) => {
    return {
        type: LOGIN,
        user: user

    }
}

export function handleSignup() {
    return dispatch => dispatch(signup())
}
export function handleLogin(user) {
    return dispatch => dispatch(login(user))
}
// export function handleLogout(){
//     return dispatch => dispatch(logout())
// }
// export function handleDeleteAccount(){
//     return dispatch => dispatch(deleteAccount())
// }


// REDUCER
const defaultState = {
    signedUp: false,
    loggedIn: false,
    user: ''
}

export const loginReducer = (state = defaultState, action) => {
    let accountState = [...state]
    switch (action.type) {
        case SIGNUP:
            return {
                accountState,
                signedUp: true
            }

        case LOGIN:
            return {
                accountState,
                loggedIn: true,
                user: action.user
            }

        default:
            return state;
    }

}