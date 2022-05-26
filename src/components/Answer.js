import '../styling/Answer.css';

function Answer(answer) {
  console.log(answer);
  return (
    <div className="Answer">
        <div id='Answer-container'>
            <button>{answer.answers}</button>
        </div>
    </div>
  );
}

export default Answer;