import "../styling/QuizComponent.css";
import Question from "./Question";
import Answer from "./Answer";
import { useEffect, useState } from "react";

function QuizComponent() {
  const [APIData, setAPI] = useState({});
  const [dataObject, setdataObject] = useState({
    APIData: {},
    question: "",
    incorrect_answers: [],
    correct_answer: "",
    answers: [],
  });
  const [question, setQuestion] = useState("");
  const [index, setIndex] = useState(0);
  // const [answers, setAnswers] = useState([]);
  const [objectsLength, setObjectsLength] = useState(0);
  const [rightAnswer, setRightAnswer] = useState({
    answer: "",
    addstyling: false,
    tag: 0,
  });

  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const json = await data.json();
      setAPI(json.results);
      setdataObject((prevState) => ({
        ...prevState,
        APIData: json.results[index],
        question: json.results[index].question,
        incorrect_answers: [...json.results[index].incorrect_answers],
        correct_answer: json.results[index].correct_answer,
      }));

      setQuestion(json.results[index].question);
      setObjectsLength(json.results.length);
    })();
  }, []);

  useEffect(() => {
    if (dataObject.APIData && APIData[index]) {
      const random = Math.floor(Math.random() * 5);
      const object = APIData[index];
      const deepCpy = [...object.incorrect_answers];
      deepCpy.splice(random, 0, object.correct_answer);

      setdataObject((prevState) => ({
        ...prevState,
        APIData: APIData[index],
        question: APIData[index].question,
        incorrect_answers: [...APIData[index].incorrect_answers],
        correct_answer: APIData[index].correct_answer,
        answers: [...deepCpy],
      }));

      // setAnswers(deepCpy);
      setQuestion(object.question);
      setRightAnswer((prevState) => ({
        ...prevState,
        answer: APIData[index].correct_answer,
        addstyling: false,
        tag: random,
      }));
    }
  }, [index, APIData]);

  const nextQuestion = function () {
    if (index !== objectsLength - 1) {
      setIndex((prevState) => prevState + 1);
    } else {
      console.log("This is the last question.");
    }
  };

  const isRightAnswer = function (userAnswer, tag) {
    console.log(tag);
    if (userAnswer === dataObject.correct_answer) {
      console.log("Right answer!");
      setRightAnswer((prevState) => ({
        ...prevState,
        addstyling: true,
        tag: tag,
      }));
    } else console.log("NOPE");
  };

  const hint = function () {
    //removes one inncorect answer on each click

    const random = Math.floor(Math.random() * 5);
    dataObject.incorrect_answers.pop();
    const deepCpy = [...dataObject.incorrect_answers];
    deepCpy.splice(random, 0, dataObject.correct_answer);

    setdataObject((prevState) => ({
      ...prevState,
      answers: [...deepCpy],
    }));
  };
  return (
    <div className="QuizComponent">
      <h1>QUIZ COMPONENT</h1>
      <div>
        <Question question={question} index={index} />
      </div>

      <div>
        <button onClick={() => nextQuestion(index)}>Next question</button>
        <button id="hint" onClick={() => hint()}>
          Hint
        </button>
      </div>

      <div id="main-answers-container">
        {dataObject.answers.map(function (item, i) {
          return (
            <Answer
              key={i}
              tag={i}
              rightAnswer={rightAnswer}
              answer={item}
              index={index}
              isRightAnswer={isRightAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuizComponent;
