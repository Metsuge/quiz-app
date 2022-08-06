/* eslint-disable */
import "../styling/QuizComponent.css";
import Question from "./Question";
import Answer from "./Answer";
import {useEffect, useState} from "react";
import {decode} from "html-entities";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Oval} from "react-loader-spinner";
import store from "../redux/store";
import {useSelector, useDispatch} from "react-redux";
import * as actions from "../redux/fetchAPIData/actions";

function QuizComponent() {
  const selectAPIData = (state) => state.APIreducer;
  const selectUserData = (state) => state.userStatusReducer;
  const {
    objectsLength,
    APIData,
    index,
    answers,
    correct_answer,
    loading,
    correct_answer_tag,
  } = useSelector(selectAPIData);

  const {answer_selected, incorrect_answers, correct_answers, hints_taken} =
    useSelector(selectUserData);
  const dispatch = useDispatch();
  const logCurrentStore = function () {
    const latestStore = store.getState();
    // console.log("latestStore", latestStore.APIreducer.index);
  };

  const fetchData = () => {
    dispatch(actions.fetchAPIRequest());
    (async () => {
      try {
        const data = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const json = await data.json();
        dispatch(actions.fetchAPISuccess(json));
      } catch (error) {
        fetchAPIFailure(error.message);
      }
    })();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // all answers are put in array
    if (APIData.results && APIData.results[index]) {
      const object = APIData.results[index];
      const random = Math.floor(Math.random() * 4);
      const deepCopy = [...object.incorrect_answers];
      deepCopy.splice(random, 0, object.correct_answer);
      let payload = {deepCopy: deepCopy, APIData: APIData};
      dispatch(actions.APIDataHandling(payload));
      dispatch(actions.correctAnswerTag(random));
    }
    store.subscribe(logCurrentStore);
  }, [index, APIData]);

  const nextQuestion = function () {
    dispatch(actions.incrementIndex());
    dispatch(actions.reloadHint());
  };

  const isRightAnswer = function (userAnswer, tag) {
    // Checks if user selected answer is right
    if (userAnswer === correct_answer) {
      dispatch(actions.correctAnswersClicked());
    } else {
      dispatch(actions.inCorrectAnswersClicked());
    }
  };

  const getWrongAnswers = function () {
    let buttonArray = [].slice.call(
      document.getElementsByClassName("button answers")
    );
    var filtered = buttonArray.filter(function (value, index, arr) {
      return value.innerHTML !== correct_answer;
    });

    filtered[hints_taken].style.display = "none";
  };

  const hint = function () {
    getWrongAnswers();
    dispatch(actions.useHint());
  };

  const restart = function () {
    dispatch(actions.reloadIndex());
    dispatch(actions.reloadQuiz());
  };

  return (
    <div className="QuizComponent">
      <div id="loader">
        {loading ? (
          <Oval height="100" width="100" color="grey" ariaLabel="loading" />
        ) : (
          <>
            <div>Your score:{correct_answers}</div>
            {index < 8 ? (
              <div id="main-quiz-elements">
                <div>
                  Question {index + 1} out of {objectsLength}
                </div>

                <div>
                  <Question index={index} />
                </div>

                <div id="main-buttons">
                  {!answer_selected ? (
                    <button
                      disabled={false}
                      className="button next"
                      onClick={() => nextQuestion(index)}
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      disabled={!answer_selected}
                      className="button next"
                      onClick={() => nextQuestion(index)}
                    >
                      Next question
                    </button>
                  )}

                  {!answer_selected ? (
                    <button
                      className="button hint"
                      id="hint"
                      onClick={() => hint()}
                    >
                      Hint
                    </button>
                  ) : (
                    <></>
                  )}
                </div>

                <div id="main-answers-container">
                  {answers.map(function (item, i) {
                    return (
                      <Answer
                        key={i}
                        tag={i}
                        correct_answer_tag={correct_answer_tag}
                        answer={decode(item, {level: "all"})}
                        isRightAnswer={isRightAnswer}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div id="finish">
                <div id="finish-text">Quiz finished!</div>
                <div id="stats" className="stats-text h1">
                  Statistics:
                  <div className="stats-text">
                    Right answers: {correct_answers}{" "}
                  </div>
                  <div className="stats-text">
                    Wrong answers: {incorrect_answers}{" "}
                  </div>
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
