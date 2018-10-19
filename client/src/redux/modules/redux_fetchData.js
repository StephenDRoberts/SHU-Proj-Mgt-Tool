// ACTION CONSTANTS FOR LOADING DATA TO REDUX
const FETCH_DATA_BEGIN   = 'FETCH_DATA_BEGIN';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
const FETCH_DATA_FINAL = 'FETCH_DATA_FINAL';
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


//FETCH FUNCTION (THUNK???)
export function fetchData() {
  console.log('i think im fetching data')
    return dispatch => {
      console.log('trying to begin...')
      
      dispatch(fetchDataBegin());
      
      return fetch("/api/provideData")
        .then(handleErrors)
        .then(res => {
          console.log(res)
          if(res.ok){
            console.log("we're ok")
            return res.json()
          }
          // return Promise.reject('Did not retrieve data')
        })
        .then(data => {
          console.log('possible success???')
          console.log(data)
          dispatch(fetchDataSuccess(data));
          console.log(data)
          return data;
        })
        .then(data=>{
          dispatch(fetchDataFinal(data));
          return data
        })
        .catch(error => {
          console.log('oopsie daze.....')
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

//REDUCER  
  const initialState = {
    data: [],
    loading: false,
    error: null
  };
  
  export const dataReducer=(state = initialState, action)=>{
    console.log(action)
    
    switch(action.type) {
      case FETCH_DATA_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_DATA_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
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
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          data: []
        };

        case FETCH_DATA_FINAL:
        console.log(state)
        return state;
        
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }