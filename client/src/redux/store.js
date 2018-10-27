import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {dataReducer} from './modules/dataReducer.js'
import {changeProjectReducer} from './modules/changeProject.js'
import {loginReducer} from './modules/loginReducer.js'

const reducer = combineReducers({
    dataReducer,
    changeProjectReducer,
    loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;

