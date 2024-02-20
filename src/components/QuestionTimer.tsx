import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, maxTime, mode }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    console.log("SETTING TIMEOUT", maxTime);
    const timer = setTimeout(onTimeout, maxTime);
    return () => {
      clearTimeout(timer);
    };
  }, [maxTime, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL", maxTime);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <progress
        id="question-time"
        value={timeLeft}
        max={maxTime}
        className={mode}
      ></progress>
    </>
  );
}
