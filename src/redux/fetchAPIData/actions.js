import {FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE} from "./actionTypes";
import axios from "axios";
// const redux = require("redux");
// const configureStore = redux.configureStore;

const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchAPIRequest());
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        // response.data is the users
        const data = response.data;
        dispatch(fetchAPISuccess(data));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchAPIFailure(error.message));
      });
  };
};

export const fetchAPISuccess = (APIData) => {
  return {
    type: FETCH_API_SUCCESS,
    payload: APIData,
  };
};

export const fetchAPIFailure = (error) => {
  return {
    type: FETCH_API_FAILURE,
    payload: error,
  };
};

export const fetchAPIRequest = () => {
  return {
    type: FETCH_API_REQUEST,
  };
};

// const store = configureStore(reducer);
export default fetchData;
