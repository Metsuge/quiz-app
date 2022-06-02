import '../styling/QuizComponent.css';
import Question from './Question';
import Answer from './Answer';
import { useEffect, useState } from 'react';



function QuizComponent() {
  let answerElements = [];
  const random = Math.floor(Math.random() * 5);

  const [APIData, setAPI] = useState({});
  const [question, setQuestion] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(()=>{
    (async () => {
      const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');
      const json = await data.json();
      setAPI(json.results)
      setQuestion(json.results[index].question)
      
      setAnswers(answers =>[...answers, [...json.results[index].incorrect_answers]]);
      // setAnswers(answers => answers.splice(random, json.results[index].correct_answer))

    })();
  }, []);
  console.log('answers',answers);
  if(APIData[index]){
    console.log(APIData[0]);

    for (let i=0; i< (APIData[index].incorrect_answers.length +1); i++){
      let answerArray = [...APIData[i].incorrect_answers];
      // console.log(answerArray);
      // console.log(answerArray.splice(random, (random-1), APIData[i].correct_answer));
      // setAnswers(answers =>[...answers, answerArray]);
      
      // answerElements.push(<Answer key={i} answer={answerArray[i]} />)
      
      
    }
  }
  
  
console.log('APIData',APIData);
if(APIData[0]){
  console.log('answers', answers.splice(random, 0, APIData[0].correct_answer));
}

  return (
    <div className="QuizComponent">
        
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question question={question} APIData={APIData}/>
            </div>
            
            <div><button>Next question/ </button></div>
        
        <div id='main-answers-container'> 
        {/* {answerElements}  */}
      </div>
    </div>
  );
}

export default QuizComponent;