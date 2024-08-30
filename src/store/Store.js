import { createStore, applyMiddleware, compose } from "redux";
import RootReducers from "./reducers/index";
import {thunk} from "redux-thunk";

const initState = {};
const middleWare = [thunk]
const composeEnhcancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(  
    RootReducers,
    initState,
    composeEnhcancers(applyMiddleware(...middleWare))
)

export default store; 