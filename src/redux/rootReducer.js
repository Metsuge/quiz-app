import {combineReducers} from "redux";
import APIreducer from "./fetchAPIData/APIreducer";

const rootReducer = combineReducers({
  APIreducer: APIreducer,
});

export default rootReducer;
