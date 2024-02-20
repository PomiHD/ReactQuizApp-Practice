import QUESTIONS from "../questions.ts";
import { useCallback, useState } from "react";
import QuizOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.tsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  /**
   *  The active question index is the length of the user answers array
   *  if the answer state is empty, otherwise it is the length of the user
   *  answers array minus 1.
   *  This is because the user answers array is updated after the answer state
   *  is set to "answered" and the active question index is used to determine
   *  the current question.
   */
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizOver = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer: any) {
      setAnswerState("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
  );

  const handelSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (quizOver) {
    return (
      <div id={"summary"}>
        <img src={QuizOverImg} alt={"quiz over"} />
        <div>overview</div>
        <ul id={"answers"}>
          {userAnswers.map((answer, index) => (
            <li key={index} className={"answer"}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <main>
        <div id={"quiz"}>
          <div id={"question"}>
            <QuestionTimer
              key={activeQuestionIndex}
              onTimeout={handelSkipAnswer}
              maxTime={4000}
            />
            <h2 id={"question-overview"}>
              {QUESTIONS[activeQuestionIndex].text}
            </h2>
            <ul id={"answers"}>
              {QUESTIONS[activeQuestionIndex].answers.map((answers) => {
                let cssClass = "";
                const isSelected =
                  userAnswers[userAnswers.length - 1] === answers;
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
                      onClick={() => handleSelectAnswer(answers)}
                      className={cssClass}
                    >
                      {answers}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
