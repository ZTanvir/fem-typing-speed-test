import { useEffect, useState } from "react";

type CountDownTimerProps = {
  mode: "timed" | "passage";
  isTestRunning: boolean;
};

const CountDownTimer = ({ mode, isTestRunning }: CountDownTimerProps) => {
  const [second, setSeconds] = useState(mode === "timed" ? 60 : 0);

  const formatTime = () => {
    if (mode === "timed") {
      if (second >= 0 && second <= 9) {
        return `0:0${second}`;
      }

      return `0:${second}`;
    } else if (mode === "passage") {
      if (mode === "passage") {
        const minute = Math.trunc(second / 60);
        const sec = second % 60;
        if (sec >= 0 && sec <= 9) {
          return `${minute}:0${sec}`;
        }
        return `${minute}:${sec}`;
      }
    }
  };

  useEffect(() => {
    let intervalId: number;
    function startTimer() {
      if (isTestRunning) {
        intervalId = setInterval(() => {
          setSeconds((prevSecond) => {
            if (mode === "timed") {
              if (prevSecond <= 0) {
                clearInterval(intervalId);
                // isTestRunning(false);
                return 0;
              }
              return prevSecond - 1;
            } else {
              return prevSecond + 1;
            }
          });
        }, 1000);
      }
    }

    startTimer();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTestRunning]);

  return (
    <span className={isTestRunning ? "text-yellow-400" : "text-neutral-50"}>
      {formatTime()}
    </span>
  );
};
export default CountDownTimer;
