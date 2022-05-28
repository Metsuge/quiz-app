import '../styling/Answer.css';

function Answer({answers, isRightAnswer}) {
  return (
    <div className="Answer">
        <div id='Answer-container'>
            <button onClick={() => {isRightAnswer(answers)}}>{answers}</button>
        </div>
    </div>
  );
}

export default Answer;