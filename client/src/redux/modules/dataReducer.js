// ACTION CONSTANTS FOR LOADING DATA TO REDUX
const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
const FETCH_DATA_FINAL = 'FETCH_DATA_FINAL';

//TICKET ACTION CONSTANTS
const ADD = 'ADD'
const EDIT = 'EDIT'
const DELETE = 'DELETE'
const FINISHED = 'FINISHED'

const ADD_PROJECT = 'ADD_PROJECT'
const DELETE_PROJECT = 'DELETE_PROJECT'

const CHANGE_STYLE = 'CHANGE_STYLE'

// ACTION CREATORS
const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data }
});

const fetchDataError = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});
const fetchDataFinal = data => ({
  type: FETCH_DATA_FINAL,
  payload: { data }
});

const addTicket = (ticket, projNumber) => {
  return {
    type: ADD,
    ticket: ticket,
    projNumber: projNumber
  }
}

const editTicket = (ticket, ticketNum, projNumber) => {
  return {
    type: EDIT,
    ticket: ticket,
    ticketNum: ticketNum,
    projNumber: projNumber
  }
}

const deleteTicket = (ticketNum, projNumber) => {
  return {
    type: DELETE,
    ticketNum: ticketNum,
    projNumber: projNumber
  }
}

const finished = () => {
  return {
    type: FINISHED
  }
}

const addProject = (projName) => {
  return {
    type: ADD_PROJECT,
    projName: projName
  }
}

const deleteProject = (projNumber) => {
  return {
    type: DELETE_PROJECT,
    projNumber: projNumber
  }
}

const changeStyle = (className, style)=>{
  return {
    type: CHANGE_STYLE,
    className: className,
    style: style
  }
}


//FETCH FUNCTION (THUNK???)
export function fetchData(user) {
  return dispatch => {
    dispatch(fetchDataBegin());

    return fetch("/api/provideData", {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({
        user: user,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(handleErrors)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => {
        dispatch(fetchDataSuccess(data));
        return data;
      })
      .then(data => {

        dispatch(fetchDataFinal(data));
        return data
      })
      .catch(error => {
        dispatch(fetchDataError(error))
      });
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}


export function handleAddTicket(data, projNumber) {
  return dispatch => dispatch(addTicket(data, projNumber))
}
export function addTicketFinished() {
  return dispatch => dispatch(finished())
}
export function handleEditTicket(ticket, ticketNum, projNumber) {
  return dispatch => dispatch(editTicket(ticket, ticketNum, projNumber))
}
export function handleDeleteTicket(ticketNum, projNumber) {
  return dispatch => dispatch(deleteTicket(ticketNum, projNumber))
}
export function handleAddProject(projName) {
  return dispatch => dispatch(addProject(projName))
}
export function handleDeleteProject(projNumber) {
  return dispatch => dispatch(deleteProject(projNumber))
}
export function handleChangeStyle(className, style) {
  return dispatch => dispatch(changeStyle(className, style))
}

//REDUCER  
const initialState = {
  data: [],
  loading: false,
  error: null
};

export const dataReducer = (state = initialState, action) => {


  switch (action.type) {
    case FETCH_DATA_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      // let beginState = [...state]
      return {
        ...state,
        loading: true,
        error: null,
        data: []
      };

    case FETCH_DATA_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      //let successState = [...state]
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };

    case FETCH_DATA_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      // let failureState =[...state]
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      };

    case FETCH_DATA_FINAL:
      return state;

    case ADD:
      let addState = [...state.data]
      addState[0].projects[action.projNumber].tasks.push(action.ticket)
      return { data: addState }

    case EDIT:
      let editState = [...state.data]
      editState[0].projects[action.projNumber].tasks[action.ticketNum] = action.ticket
      return { data: editState }

    case DELETE:
      let deleteState = [...state.data]
      console.log(deleteState)
      deleteState[0].projects[action.projNumber].tasks.splice(action.ticketNum, 1)
      return { data: deleteState }

    case FINISHED:
      return state

    case ADD_PROJECT:
    let addProjState = [...state.data]
      addProjState[0].projects.push({
        projTitle: action.projName,
        tasks: []
      })
      return { data: addProjState }

    case DELETE_PROJECT:
      let deleteProjState = [...state.data]
      deleteProjState[0].projects.splice(action.projNumber, 1)
      return { data: deleteProjState }

    case CHANGE_STYLE:
    let changeStyleState = [...state.data]
    let className = action.className
    if(changeStyleState[0].styles[className]===undefined){
      changeStyleState[0].styles[className] = [{"backgroundColor":action.style}]
    } else {
    changeStyleState[0].styles[className][0].backgroundColor = action.style
    }
    // console.log(changeStyleState[action.className])
    return { data: changeStyleState }

    default:
      return state;
  }
}