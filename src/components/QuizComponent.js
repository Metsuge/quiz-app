import '../styling/QuizComponent.css';
import Question from './Question';
import Answer from './Answer';
import { useEffect, useState } from 'react';

function QuizComponent({answers, rightAnswer, index, question, nextQuestion} ) {
  console.log('index', index);

  const isRightAnswer = function(userAnswer){
    if(userAnswer === rightAnswer){
      console.log('Right answer!');
    } else console.log('NOPE');
  };

  return (
    <div className="QuizComponent">
        <div id='quiz-container'>
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question question={question}/>
            </div>
            <div id='main-answers-container'> 
              {answers[index] ? answers[index].map((object, i) => <Answer answers={object} key={i} isRightAnswer={isRightAnswer} />) : ''}
            </div>
            <div><button onClick={()=>nextQuestion(index)}>Next question/ </button></div>
        </div> 
        
    </div>
  );
}

export default QuizComponent;