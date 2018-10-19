import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {ticketReducer} from './modules/tickets.js'
import {dataReducer} from './modules/redux_fetchData.js'
import {changeProjectReducer} from './modules/changeProject.js'

const reducer = combineReducers({
    dataReducer,
    ticketReducer,
    changeProjectReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;

