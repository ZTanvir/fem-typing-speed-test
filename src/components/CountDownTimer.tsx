import { useEffect, useState } from "react";

type CountDownTimerProps = {
  mode: "timed" | "passage";
  isTestRunning: boolean;
};

const CountDownTimer = ({
  mode,
  isTestRunning,
  setTestRunning,
}: CountDownTimerProps) => {
  const [second, setSeconds] = useState(mode === "timed" ? 60 : 0);

  useEffect(() => {
    let intervalId: number;
    function startTimer() {
      if (isTestRunning) {
        intervalId = setInterval(() => {
          if (mode === "timed") {
            setSeconds(second - 1);
          } else if (mode === "passage") {
            setSeconds(second + 1);
          }
        }, 1000);
      }
    }

    startTimer();
  }, [isTestRunning]);

  return <div></div>;
};
export default CountDownTimer;
