import QUESTIONS from "../questions.ts";
import { useState } from "react";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  function handleSelectAnswer(selectedAnswer: string) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
  return (
    <>
      <main>
        {activeQuestionIndex < QUESTIONS.length ? (
          <div id={"quiz"}>
            <p>progress bar</p>
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
        ) : (
          <div id={"question"}>
            <div>overview</div>
            <ul id={"answers"}>
              {userAnswers.map((answer, index) => (
                <li key={index} className={"answer"}>
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
