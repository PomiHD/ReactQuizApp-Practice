import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";
import { useState } from "react";
import QUESTIONS from "../questions.ts";
export default function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[questionIndex].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else {
    answerState = "answered";
  }
  return (
    <>
      <div id={"question"}>
        <QuestionTimer
          key={timer}
          onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
          maxTime={timer}
          mode={answerState}
        />
        <h2>{QUESTIONS[questionIndex].text}</h2>
        <Answers
          answers={QUESTIONS[questionIndex].answers}
          answerState={answerState}
          selectedAnswer={answer.selectedAnswer}
          onSelect={handleSelectAnswer}
        />
      </div>
    </>
  );
}
