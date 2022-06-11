import "../styling/Answer.css";
import { useEffect, useState } from "react";

function Answer({ answer, index, isRightAnswer, tag, rightAnswer }) {
  // useEffect(() => {
  //   const button = document.getElementById(`button-${rightAnswer.tag}`);
  //   console.log(button);
  //   if (button) {
  //     if (rightAnswer.addstyling) {
  //       button.style.border = "1px solid red";
  //     } else {
  //       button.style.border = "";
  //     }
  //   }
  // });

  return (
    <div className="Answer" tag={tag}>
      {/* <div id='Answer-container'> */}
      <button
        id={"button-" + tag}
        tag={tag}
        onClick={() => isRightAnswer(answer, tag)}
      >
        {answer}
      </button>
      {/* </div> */}
    </div>
  );
}

export default Answer;
