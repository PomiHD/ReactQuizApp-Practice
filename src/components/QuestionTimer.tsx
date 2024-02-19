import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, maxTime }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, maxTime);
    // return clearTimeout(timer);
  }, [maxTime, onTimeout]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 100);
    }, 100);

    // return clearInterval(timer);
  }, []);

  return (
    <>
      <progress id="question-time" value={timeLeft} max={maxTime}></progress>
    </>
  );
}
