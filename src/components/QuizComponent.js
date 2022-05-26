import '../styling/QuizComponent.css';
import Question from './Question';
import Answer from './Answer';
import { useEffect, useState } from 'react';

function QuizComponent(data) {
  // const [ question, setquestion] = useState();

  // if(data.data && data.data.results.length > 0){
  //   // console.log(data.data.results);
  //   // console.log(data);
  //   // setquestion(data.data.results[0].question)
  // } else console.log('Loading');


  return (
    <div className="QuizComponent">
        <div id='quiz-container'>
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question data={data}/>
            </div>
            <div id='main-answers-container'> 
                <Answer />
                <Answer />
                <Answer />
            </div>
            
        </div>
        
    </div>
  );
}

export default QuizComponent;