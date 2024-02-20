import QUESTIONS from "../questions.ts";
import { useCallback, useState } from "react";
import QuizOverImg from "../assets/quiz-complete.png";
import Question from "./Question.tsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  /**
   *  The active question index is the length of the user answers array
   *  if the answer state is empty, otherwise it is the length of the user
   *  answers array minus 1.
   *  This is because the user answers array is updated after the answer state
   *  is set to "answered" and the active question index is used to determine
   *  the current question.
   */
  const activeQuestionIndex = userAnswers.length;
  const quizOver = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer: any,
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

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

  return (
    <>
      <main>
        <div id={"quiz"}>
          <Question
            key={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handelSkipAnswer}
            questionIndex={activeQuestionIndex}
          />
        </div>
      </main>
    </>
  );
}
