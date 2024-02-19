import QUESTIONS from "../questions.ts";
import { useCallback, useState } from "react";
import QuizOverImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.tsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

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
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <main>
        <div id={"quiz"}>
          <div id={"question"}>
            <QuestionTimer onTimeout={handelSkipAnswer} maxTime={3000} />
            <h2 id={"question-overview"}>
              {QUESTIONS[activeQuestionIndex].text}
            </h2>
            <ul id={"answers"}>
              {QUESTIONS[activeQuestionIndex].answers.map((answers) => (
                <li key={answers} className={"answer"}>
                  <button onClick={() => handleSelectAnswer(answers)}>
                    {answers}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
