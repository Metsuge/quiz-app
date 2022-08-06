import * as actionTypes from "./actionTypes";

export const fetchAPISuccess = (APIData) => {
  return {
    type: actionTypes.FETCH_API_SUCCESS,
    payload: APIData,
  };
};

export const fetchAPIFailure = (error) => {
  return {
    type: actionTypes.FETCH_API_FAILURE,
    payload: error,
  };
};

export const fetchAPIRequest = () => {
  return {
    type: actionTypes.FETCH_API_REQUEST,
  };
};

export const APIDataHandling = (APIData) => {
  return {
    type: actionTypes.HANDLE_API_REQUEST,
    payload: APIData,
  };
};

export const incrementIndex = () => {
  return {
    type: actionTypes.INCREMENT_QUESTION_INDEX,
  };
};

export const correctAnswerTag = (tag) => {
  return {
    type: actionTypes.CORRECT_ANSWER_TAG,
    payload: tag,
  };
};

export const reloadIndex = () => {
  return {
    type: actionTypes.RELOAD_INDEX,
  };
};

/* ************ USER STATUS ACTIONS *********************** */

export const correctAnswersClicked = () => {
  return {
    type: actionTypes.CORRECT_ANSWER_CLICKED,
  };
};

export const inCorrectAnswersClicked = () => {
  return {
    type: actionTypes.INCORRECT_ANSWER_CLICKED,
  };
};

export const useHint = () => {
  return {
    type: actionTypes.USED_HINT,
  };
};

export const reloadHint = () => {
  return {
    type: actionTypes.RELOAD_HINT,
  };
};

export const reloadQuiz = () => {
  return {
    type: actionTypes.RELOAD_QUIZ,
  };
};
