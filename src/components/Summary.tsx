import QuizOverImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.ts";
export default function Summary({ userAnswers }) {
  const correctAnswers = (
    (userAnswers.filter((x, i) => x === QUESTIONS[i].answers[0]).length /
      QUESTIONS.length) *
    100
  ).toFixed(1);
  const wrongAnswers = (
    (userAnswers.filter((x, i) => x !== null && x !== QUESTIONS[i].answers[0])
      .length /
      QUESTIONS.length) *
    100
  ).toFixed(1);
  const skippedAnswers = (
    (userAnswers.filter((x) => x === null).length / QUESTIONS.length) *
    100
  ).toFixed(1);

  return (
    <>
      <div id={"summary"}>
        <img src={QuizOverImg} alt={"quiz over"} />
        <h2>Quiz Completed!</h2>
        <div id={"summary-stats"}>
          <p>
            <span className={"number"}>{skippedAnswers}%</span>
            <span className={"text"}>skipped:</span>
          </p>
          <p>
            <span className={"number"}>{correctAnswers}%</span>
            <span className={"text"}>correct:</span>
          </p>
          <p>
            <span className={"number"}>{wrongAnswers}%</span>
            <span className={"text"}>wrong:</span>
          </p>
        </div>
        <ol>
          {userAnswers.map((answer, index) => {
            let cssClass = "user-answer ";
            if (answer === null) {
              cssClass += "skipped";
            } else if (answer === QUESTIONS[index].answers[0]) {
              cssClass += "correct";
            } else {
              cssClass += "wrong";
            }
            return (
              <li key={index}>
                <h3>Q{index + 1}</h3>
                <p className={"question"}>{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "skipped"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
