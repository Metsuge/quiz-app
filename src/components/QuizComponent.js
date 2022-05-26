import '../styling/QuizComponent.css';
import Question from './Question';
import Answer from './Answer';
import { useEffect, useState } from 'react';

function QuizComponent(data ) {
  console.log(data.answers[0]);
  return (
    <div className="QuizComponent">
        <div id='quiz-container'>
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question question={data.question}/>
            </div>
            <div id='main-answers-container'> 

            {data.answers[0].map((object, i) => <Answer answers={object} key={i} />)}
              
            
          
                
            </div>
            
        </div> 
        
    </div>
  );
}

export default QuizComponent;