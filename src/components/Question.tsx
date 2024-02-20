import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";

export default function Question({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
  onSkipAnswer,
}) {
  return (
    <>
      <div id={"question"}>
        <QuestionTimer onTimeout={onSkipAnswer} maxTime={10000} />
        <h2>{questionText}</h2>
        <Answers
          answers={answers}
          answerState={answerState}
          selectedAnswer={selectedAnswer}
          onSelect={onSelectAnswer}
        />
      </div>
    </>
  );
}
