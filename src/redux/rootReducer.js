import {combineReducers} from "redux";
import {
  APIreducer,
  indexReducer,
  userStatusReducer,
} from "./fetchAPIData/reducers";

const rootReducer = combineReducers({
  APIreducer,
  userStatusReducer,
});

export default rootReducer;
