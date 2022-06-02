import '../styling/Answer.css';
import { useEffect, useState } from 'react';

function Answer({ answer}) {
 console.log(answer);
  // const [answers, setAnswers] = useState([]);

  // let answerArray = [...APIData[index].incorrect_answers];
  // answerArray = answerArray.splice(random, APIData[index].correct_answer)
  // setAnswers(answers =>[...answers, answerArray]);

  return (
    <div className="Answer">
        <div id='Answer-container'>
            <button ></button>
        </div>
    </div>
  );
}

export default Answer;