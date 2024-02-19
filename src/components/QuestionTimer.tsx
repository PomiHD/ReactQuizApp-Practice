import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, maxTime }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    console.log("SETTING TIMEOUT", maxTime);
    setTimeout(onTimeout, maxTime);
  }, [maxTime, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL", maxTime);
    setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 100);
    }, 100);
  }, []);

  return (
    <>
      <progress id="question-time" value={timeLeft} max={maxTime}></progress>
    </>
  );
}
