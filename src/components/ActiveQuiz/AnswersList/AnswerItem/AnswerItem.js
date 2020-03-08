import React from "react";
import "./AnswerItem.css";

const AnswerItem = props => {
  const cls = ["Answeritem"]

  if (props.state) {
    cls.push(props.state)
  }

  return (
    <li
      className={cls.join(" ")}
      onClick={() => props.handleAnswer(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswerItem;