import '../styling/Question.css';
import {useState} from 'react';

function Question({question}) {
// console.log(data.question);
// const [question, setQuestion] = useState(data.question);

  return (
    <div className="Question">
        <div id='Question-container'><p>Question: {question}</p></div>
        <div></div>
    </div>
  );
}

export default Question;