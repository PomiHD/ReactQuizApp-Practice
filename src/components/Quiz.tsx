import QUESTIONS from "../questions.ts";
import { useState } from "react";
import QuizOverImg from "../assets/quiz-complete.png";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizOver = activeQuestionIndex === QUESTIONS.length;
  function handleSelectAnswer(selectedAnswer: string) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
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
