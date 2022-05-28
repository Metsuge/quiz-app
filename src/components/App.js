import '../styling/App.css';
import QuizComponent from './QuizComponent';
import { useEffect, useState } from 'react';

function App() {
const [ APIData, setAPI] = useState({});
const [question, setQuestion] = useState("");
const [answers, setAnswers] = useState([]);
const [rightAnswer, setRightAnswer] = useState("");
const random = Math.floor(Math.random() * 5);
const [index, setIndex] = useState(0);
const [objectsLength, setObjectsLength] = useState(0);


useEffect(()=>{
  (async () => {
    const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');
    const json = await data.json();

    setQuestion(json.results[index].question)
    let answerArray = [...json.results[index].incorrect_answers];
    answerArray.splice(random,json.results[index].correct_answer)
    setAnswers(answers =>[...answers, answerArray]);

    setRightAnswer(json.results[index].correct_answer);
    setObjectsLength(json.results.length);
  })();
}, []);

const nextQuestion = function(){
  if(index !== (objectsLength.length -1)){
    setIndex(index + 1);
    console.log('question nr', index);   
  } else {
    console.log('This is the last question.');
  }
};

// nextQuestion()
return (
    <div className="App">
      {<QuizComponent question={question} index={index} answers={answers} rightAnswer={rightAnswer} nextQuestion={nextQuestion}/>}
      
    </div>
  );
}

export default App;
