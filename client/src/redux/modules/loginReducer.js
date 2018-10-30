
// ACTION TYPE CONSTANTS
const SIGNUP = 'SIGNUP'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const DELETE = 'DELETE'

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
const logout = () => {
    return {
        type: LOGOUT,
    }
}
const deleteAccount=(user)=>{
    return {
        type: DELETE,
        user: user
    }
}

export function handleSignup() {
    return dispatch => dispatch(signup())
}
export function handleLogin(user) {
    return dispatch => dispatch(login(user))
}
export function handleLogout(){
    return dispatch => dispatch(logout())
}
export function handleDeleteAccount(user){
    return dispatch => dispatch(deleteAccount(user))
}


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

        case LOGOUT:
        return {
            accountState,
            loggedIn: false,
            user: ''
        }

        case DELETE:
        return {
            accountState,
            loggedIn: false,
            user: ''
        }

        default:
            return state;
    }

}