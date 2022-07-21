import {FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE} from "./actionTypes";

const initialAPIState = {
  loading: false,
  error: "",
  APIData: {},
  question: "",
  incorrect_answers: [],
  correct_answer: "",
  answers: [],
  answersEnabled: true,
};

const APIreducer = (state = initialAPIState, action) => {
  switch (action.type) {
    case FETCH_API_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_API_SUCCESS:
      return {
        loading: false,
        APIData: action.payload,
        error: "",
      };

    case FETCH_API_FAILURE:
      return {
        loading: false,
        APIData: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default APIreducer;
