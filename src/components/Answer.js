import "../styling/Answer.css";
import {useEffect, useState} from "react";

function Answer({answer, index, isRightAnswer, tag, rightAnswer}) {
  useEffect(() => {
    let buttonArray = [].slice.call(document.getElementsByClassName("button answers"));
    for (let i = 0; i < 4; i++) {
      buttonArray[i].disabled = false;
      document.getElementById(`button-${tag}`).style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)";
    }

    document.getElementById(`button-${tag}`).addEventListener("click", function () {
      if (tag === rightAnswer.tag && document.getElementById(`button-${tag}`)) {
        // If the selected answer is right, turn green
        document.getElementById(`button-${tag}`).style.backgroundImage = "linear-gradient(92.88deg, #80d296 43.89%, #28cf9a 64.72%)";
      } else if (tag !== rightAnswer.tag && document.getElementById(`button-${tag}`)) {
        // Else turn red
        document.getElementById(`button-${tag}`).style.backgroundImage = "linear-gradient(92.88deg, #b54545 9.16%, #cc4343 43.89%, #d73f3f 64.72%)";
      }

      // Uncliked answers are disabled
      for (let i = 0; i < 4; i++) {
        if (buttonArray[i].getAttribute("tag") !== tag.toString()) {
          buttonArray[i].disabled = true;
          document.getElementById(`button-${i}`).style.backgroundImage = "linear-gradient(92.88deg, #c4c4c4 43.89%, #cdcdcd 64.72%)";
        } else {
          buttonArray[i].disabled = false;
        }
      }
    });
  }, [answer]);

  return (
    <div className="Answer" tag={tag}>
      {/* <div id='Answer-container'> */}
      <button id={"button-" + tag} className="button answers" tag={tag} onClick={() => isRightAnswer(answer, tag)}>
        {answer}
      </button>
      {/* </div> */}
    </div>
  );
}

export default Answer;
