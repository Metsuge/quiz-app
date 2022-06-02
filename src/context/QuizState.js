import React, {useReducer} from 'react';
import { NEXT_QUESTION, RIGHT_ANSWER } from './quiz-actions';
import QuizContext from './quiz-context';
import quizReducer from './quiz-reducer';


const QuizState = (props) => {

    const initialState = {
        api: {} 
    }

    const [state, dispatch] = useReducer(quizReducer, initialState);

    const NextQuestion = (index)=>{
        dispatch({
            type: NEXT_QUESTION,
            payload: index
        })
    };

    const RightAnswer = (userAnswer)=>{
        dispatch({
            type: RIGHT_ANSWER,
            payload: userAnswer
        })
    };


    return <QuizContext.Provider value={{
        api: state.api,
        NextQuestion,
        RightAnswer
    }}>{props.children}</QuizContext.Provider>
}

export default QuizState;