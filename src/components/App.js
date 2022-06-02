import '../styling/App.css';
import QuizComponent from './QuizComponent';

import { useEffect, useState } from 'react';
import QuizState from '../context/QuizState';

function App() {
// const [ APIData, setAPI] = useState({});
// const [question, setQuestion] = useState("");
// const [rightAnswer, setRightAnswer] = useState("");
// const [index, setIndex] = useState(0);
// const [objectsLength, setObjectsLength] = useState(0);


// useEffect(()=>{
//   (async () => {
//     const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');
//     const json = await data.json();
//     setAPI(json.results)
//     setQuestion(json.results[index].question)
//     // let answerArray = [...json.results[index].incorrect_answers];
//     // answerArray.splice(random,json.results[index].correct_answer)
//     // setAnswers(answers =>[...answers, answerArray]);

//     setRightAnswer();
//     setObjectsLength(json.results.length);
//   })();
// }, []);

// const nextQuestion = function(){
//   if(index !== (objectsLength.length -1)){
//     setIndex(index => index + 1);
//     console.log('question nr', index);   
    
//   } else {
//     console.log('This is the last question.');
//   }
// };

// const isRightAnswer = function(userAnswer){
//   if(userAnswer === rightAnswer){
//     console.log('Right answer!');
//   } else console.log('NOPE');
// };

return (
    <div className="App">
      <div id='quiz-container'>
      <QuizState>
        {<QuizComponent />}
      </QuizState>
      </div>
    </div>
  );
}

export default App;
