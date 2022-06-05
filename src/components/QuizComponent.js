import '../styling/QuizComponent.css';
import Question from './Question';
import Answer from './Answer';
import { useEffect, useState } from 'react';



function QuizComponent() {
  // let answerElements =[];
  const random = Math.floor(Math.random() * 5);

  const [APIData, setAPI] = useState({});
  const [question, setQuestion] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [objectsLength, setObjectsLength] = useState(0);

  useEffect(()=>{
    (async () => {
      const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');
      const json = await data.json();
      setAPI(json.results)
      setQuestion(json.results[index].question)
      setAnswers(json.results[index].incorrect_answers);
      setObjectsLength(json.results.length);

    })();
  }, []);

 if(APIData[index]){ 
  answers.splice(random,0, APIData[index].correct_answer);
  }
  
  const nextQuestion = function(){
    if(index !== (objectsLength.length -1)){
      setIndex(index => index + 1);
      setQuestion(APIData[index].question)
      setAnswers(APIData[index].incorrect_answers);
    } else {
      console.log('This is the last question.');
    }
  };

  return (
    <div className="QuizComponent">
        
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question question={question} APIData={APIData}/>
            </div>

            <div>
              <button onClick={() => nextQuestion(index)}>Next question</button>
            </div>
        
        <div id='main-answers-container'> 
        {answers.map(function(item, i){
              return <Answer key={i} answer={item} />
            })}
      </div>
    </div>
  );
}

export default QuizComponent;