/* eslint-disable */

import "../styling/Answer.css";
import {useEffect} from "react";

function Answer({answer, isRightAnswer, tag, correct_answer_tag}) {
  useEffect(() => {
    // If the tag is for a wrong answer, hitn() makes it display:none;
    let buttonArray = [].slice.call(
      document.getElementsByClassName("button answers")
    );

    buttonArray[tag].disabled = false;
    buttonArray[tag].style.backgroundImage =
      "linear-gradient(92.88deg, rgb(96, 178, 186) 9.16%, rgb(67, 146, 204) 43.89%, rgb(22, 118, 165) 64.72%)";
    buttonArray[tag].style.display = "block";

    document
      .getElementById(`button-${tag}`)
      .addEventListener("click", function () {
        if (
          tag === correct_answer_tag &&
          document.getElementById(`button-${tag}`)
        ) {
          // If the selected answer is right, turn green

          document.getElementById(`button-${tag}`).style.backgroundImage =
            "linear-gradient(92.88deg, rgb(128, 210, 150) 43.89%, rgb(40, 207, 154) 64.72%)";
        } else if (
          tag !== correct_answer_tag &&
          document.getElementById(`button-${tag}`)
        ) {
          // Else turn red
          document.getElementById(`button-${tag}`).style.backgroundImage =
            "linear-gradient(92.88deg, rgb(181, 69, 69) 9.16%, rgb(204, 67, 67) 43.89%, rgb(215, 63, 63) 64.72%)";
        }

        // Uncliked answers are disabled when user clicks on an answer
        for (let i = 0; i < 4; i++) {
          if (buttonArray[tag] && document.getElementById(`button-${tag}`)) {
            if (buttonArray[i].getAttribute("tag") !== tag.toString()) {
              buttonArray[i].disabled = true;
              document.getElementById(`button-${i}`).style.backgroundImage =
                "linear-gradient(92.88deg, rgb(196, 196, 196) 43.89%, rgb(205, 205, 205) 64.72%)";
            } else {
              buttonArray[i].disabled = false;
            }
          }
        }
      });
  }, [answer]);

  const onClickFunctions = function () {
    isRightAnswer(answer, tag);
  };

  return (
    <div className="Answer" tag={tag}>
      <button
        id={"button-" + tag}
        className="button answers"
        tag={tag}
        onClick={() => onClickFunctions()}
      >
        {answer}
      </button>
    </div>
  );
}

export default Answer;
