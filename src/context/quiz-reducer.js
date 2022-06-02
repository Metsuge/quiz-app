import {NEXT_QUESTION, RIGHT_ANSWER, WRONG_ANSWER } from './quiz-actions';

const quizReducer = (state, action) => {
    switch (action.type){
        case NEXT_QUESTION:
            //change the index of the fetched object
            return {
                state
            };
        case RIGHT_ANSWER:
            return {};
        case WRONG_ANSWER:
            return {};
        default:
            return state;
    }
};

export default quizReducer;