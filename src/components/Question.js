import "../styling/Question.css";
import {useSelector} from "react-redux";
import {decode} from "html-entities";

function Question() {
  const question = useSelector((state) => state.APIreducer.question);
  return (
    <div className="Question">
      <div id="question-container">
        <p>{decode(question, {level: "all"})}</p>
      </div>
      <div></div>
    </div>
  );
}

export default Question;
