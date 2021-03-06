import "../styling/QuizComponent.css";
import Question from "./Question";
import Answer from "./Answer";
import {useEffect, useState} from "react";
import {decode} from "html-entities";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Oval} from "react-loader-spinner";

function QuizComponent() {
  const [APIData, setAPI] = useState({});
  const [dataObject, setdataObject] = useState({
    APIData: {},
    question: "",
    incorrect_answers: [],
    correct_answer: "",
    answers: [],
    answersEnabled: true,
  });

  const [index, setIndex] = useState(0);
  const [objectsLength, setObjectsLength] = useState(0);
  const [rightAnswer, setRightAnswer] = useState({
    answer: "",
    addstyling: false,
    tag: 0,
  });

  const [userStatus, setUserStatus] = useState({
    correctAnswers: 0,
    incorrect_answers: 0,
    hintsTaken: 0,
    answerSelected: false,
  });

  useEffect(() => {
    (async () => {
      const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      const json = await data.json();
      setAPI(json.results);
      setdataObject((prevState) => ({
        ...prevState,
        APIData: json.results[index],
        question: json.results[index].question,
        incorrect_answers: [...json.results[index].incorrect_answers],
        correct_answer: json.results[index].correct_answer,
      }));

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

      setRightAnswer((prevState) => ({
        ...prevState,
        answer: APIData[index].correct_answer,
        addstyling: false,
        tag: random,
      }));

      setUserStatus((prevState) => ({
        ...prevState,
        hintsTaken: 0,
      }));
    }
  }, [index, APIData]);

  const nextQuestion = function () {
    setUserStatus((prevState) => ({
      ...prevState,
      answerSelected: false,
    }));
    //goes to next object on in the array
    if (index !== objectsLength - 1) {
      setIndex((prevState) => prevState + 1);
      console.log("index", index);
    } else if (index === 8) {
      console.log("This is the last question.");
    }
  };

  const isRightAnswer = function (userAnswer, tag) {
    // Checks if user selected answer is right

    setUserStatus((prevState) => ({
      ...prevState,
      answerSelected: true,
    }));

    if (userAnswer === dataObject.correct_answer) {
      console.log("Right answer!");
      setRightAnswer((prevState) => ({
        ...prevState,
        addstyling: true,
        tag: tag,
      }));
      setUserStatus((prevState) => ({
        ...prevState,
        correctAnswers: userStatus.correctAnswers + 1,
      }));
    } else {
      setUserStatus((prevState) => ({
        ...prevState,
        incorrect_answers: userStatus.incorrect_answers + 1,
      }));
    }
  };
  let wrongAnswrs = [];
  for (let i = 0; i < 4; i++) {
    if (i !== rightAnswer.tag) {
      wrongAnswrs.push(i);
    }
  }

  const getWrongAnswers = function () {
    let buttonArray = [].slice.call(document.getElementsByClassName("button answers"));
    var filtered = buttonArray.filter(function (value, index, arr) {
      return value.innerHTML !== dataObject.correct_answer;
    });

    filtered[userStatus.hintsTaken].style.display = "none";
  };

  const hint = function () {
    setUserStatus((prevState) => ({
      ...prevState,
      hintsTaken: userStatus.hintsTaken < 1 ? userStatus.hintsTaken + 1 : userStatus.hintsTaken,
    }));
    console.log(userStatus.hintsTaken);
    getWrongAnswers();
  };

  const restart = function () {
    setIndex(() => 0);
  };

  return (
    <div className="QuizComponent">
      <div id="loader">
        {dataObject.question === "" ? (
          <Oval height="100" width="100" color="grey" ariaLabel="loading" />
        ) : (
          <>
            <div>Your score:{userStatus.correctAnswers}</div>
            {index <= 8 ? (
              <div id="main-quiz-elements">
                <div>
                  Question {index + 1} out of {objectsLength}
                </div>

                <div>
                  <Question question={decode(dataObject.question, {level: "all"})} index={index} />
                </div>

                <div id="main-buttons">
                  {!userStatus.answerSelected ? (
                    <button disabled={false} className="button next" onClick={() => nextQuestion(index)}>
                      Skip
                    </button>
                  ) : (
                    <button disabled={!userStatus.answerSelected} className="button next" onClick={() => nextQuestion(index)}>
                      Next question
                    </button>
                  )}

                  {!userStatus.answerSelected ? (
                    <button className="button hint" id="hint" onClick={() => hint()}>
                      Hint
                    </button>
                  ) : (
                    <></>
                  )}
                </div>

                <div id="main-answers-container">
                  {dataObject.answers.map(function (item, i) {
                    return <Answer key={i} tag={i} userStatus={userStatus} rightAnswer={rightAnswer} answer={decode(item, {level: "all"})} index={index} isRightAnswer={isRightAnswer} disabled={userStatus.answerSelected} />;
                  })}
                </div>
              </div>
            ) : (
              <div id="finish">
                <div id="finish-text">Quiz finished!</div>
                <div id="stats" className="stats-text h1">
                  Statistics:
                  <div className="stats-text">Right answers: {userStatus.correctAnswers} </div>
                  <div className="stats-text">Wrong answers: {userStatus.incorrect_answers} </div>
                </div>
                <button id="play-again-main">
                  <div id="play-again" onClick={() => restart()}>
                    PLAY AGAIN
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuizComponent;
