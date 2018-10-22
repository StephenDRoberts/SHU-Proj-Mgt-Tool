import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {dataReducer} from './modules/dataReducer.js'
import {changeProjectReducer} from './modules/changeProject.js'

const reducer = combineReducers({
    dataReducer,
    changeProjectReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;

