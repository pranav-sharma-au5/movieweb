import { reducer } from "./reducer"
import { combineReducers } from "redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk";

let rootReducer = combineReducers({ reducer })
export default createStore(rootReducer, applyMiddleware(thunk))
