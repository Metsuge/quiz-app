import "../styling/Question.css";
import { useState } from "react";

function Question({ question, index }) {
  return (
    <div className="Question">
      <div id="question-container">
        <p>{question}</p>
      </div>
      <div></div>
    </div>
  );
}

export default Question;
