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
        <QuestionTimer onTimeout={onSkipAnswer} maxTime={8000} />
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
