import * as actionTypes from "./actionTypes";

const initialAPIState = {
  loading: false,
  error: "",
  APIData: {},
  question: "",
  incorrect_answers: [],
  correct_answer: "",
  correct_answer_tag: 0,
  objectsLength: 0,
  answers: [],
  index: 0,
};

const userStatus = {
  correct_answers: 0,
  incorrect_answers: 0,
  hints_taken: 0,
  answer_selected: false,
};

export const APIreducer = (state = initialAPIState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_API_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_API_SUCCESS:
      return {
        ...state,
        loading: false,
        APIData: action.payload,
        question: action.payload.results[state.index].question,
        correct_answer: action.payload.results[state.index].correct_answer,
        objectsLength: action.payload.results.length,
        error: "",
      };

    case actionTypes.CORRECT_ANSWER_TAG:
      return {
        ...state,
        correct_answer_tag: action.payload,
      };

    case actionTypes.INCREMENT_QUESTION_INDEX:
      return {
        ...state,
        index: state.index + 1,
      };

    case actionTypes.RELOAD_INDEX:
      return {
        ...state,
        index: 0,
      };

    case actionTypes.FETCH_API_FAILURE:
      return {
        loading: false,
        APIData: {},
        error: action.payload,
      };

    case actionTypes.HANDLE_API_REQUEST:
      return {
        ...state,
        answers: action.payload.deepCopy,
        question: action.payload.APIData.results[state.index].question,
        correct_answer:
          action.payload.APIData.results[state.index].correct_answer,
        incorrect_answers:
          action.payload.APIData.results[state.index].incorrect_answers,
      };
    default:
      return {
        ...state,
      };
  }
};

export const userStatusReducer = (state = userStatus, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_ANSWER_CLICKED:
      return {
        ...state,
        correct_answers: state.correct_answers + 1,
        answer_selected: true,
      };

    case actionTypes.INCORRECT_ANSWER_CLICKED:
      return {
        ...state,
        incorrect_answers: state.incorrect_answers + 1,
        answer_selected: true,
      };

    case actionTypes.USED_HINT:
      return {
        ...state,
        hints_taken:
          state.hints_taken < 3 ? state.hints_taken + 1 : state.hints_taken,
      };

    case actionTypes.RELOAD_HINT:
      return {
        ...state,
        hints_taken: 0,
        answer_selected: false,
      };

    case actionTypes.RELOAD_QUIZ:
      return {
        incorrect_answers: 0,
        correct_answers: 0,
        hints_taken: 0,
        answer_selected: false,
      };

    default:
      return {
        ...state,
      };
  }
};
