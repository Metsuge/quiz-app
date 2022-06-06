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
      setObjectsLength(json.results.length);
  
    })();
   
  }, []);

useEffect(() => {
   if (APIData[index]) {
     const random = Math.floor(Math.random() * 5);
     const object = APIData[index];
     const deepCpy = [...object.incorrect_answers];
     deepCpy.splice(random, 0, APIData[index].correct_answer);
     
     setAnswers(deepCpy);
     setQuestion(object.question);
   }
}, [index, APIData])


  const nextQuestion = function(){
    if(index !== (objectsLength.length-1)){
      setIndex(index + 1);
    console.log(objectsLength.length-1, index);
      // setQuestion(APIData[index].question);
      // setAnswers(APIData[index].incorrect_answers);
   
    } else {
      console.log('This is the last question.');
    }
  };

  return (
    <div className="QuizComponent">
        
            <h1>QUIZ COMPONENT</h1>
            <div>
                <Question question={question} APIData={APIData} index={index}/>
            </div>

            <div>
              <button onClick={() => nextQuestion(index)}>Next question</button>
            </div>
        
        <div id='main-answers-container'> 
        {answers.map(function(item, i){
              return <Answer key={i} answer={item} index={index} />
            })}
      </div>
    </div>
  );
}

export default QuizComponent;