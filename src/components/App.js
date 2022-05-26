import '../styling/App.css';
import QuizComponent from './QuizComponent';
import { useEffect, useState } from 'react';

function App() {
const [ APIData, setAPI] = useState("");
const [question, setQuestion] = useState("");
const [answers, setAnswers] = useState([]);

const random = Math.floor(Math.random() * 5);


useEffect(()=>{

  (async () => {
    const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');
    const json = await data.json();

    //setAPI(json.results[0].question);
    setQuestion(json.results[0].question)
    let answerArray = [...json.results[0].incorrect_answers];
    // answerArray.push( json.results[0].correct_answer)
    answerArray.splice(random, 0,json.results[0].correct_answer)
    setAnswers(answers =>[...answers, answerArray]);
  })();
}, [])  



return (
    <div className="App">
      {<QuizComponent question={question} answers={answers} />}
      
    </div>
  );
}

export default App;
