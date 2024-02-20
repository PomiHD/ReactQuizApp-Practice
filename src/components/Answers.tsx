import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <>
      <ul id={"answers"}>
        {shuffledAnswers.current.map((answers) => {
          let cssClass = "";
          const isSelected = selectedAnswer === answers;
          if (answerState === "answered" && isSelected) {
            cssClass = "selected";
          }
          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }
          return (
            <li key={answers} className={"answer"}>
              <button
                onClick={() => onSelect(answers)}
                className={cssClass}
                disabled={answerState !== "answered"}
              >
                {answers}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
