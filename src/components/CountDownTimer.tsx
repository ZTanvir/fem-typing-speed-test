import { useEffect } from "react";

type CountDownTimerProps = {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  mode: string;
  isTestRunning: boolean;
};

const CountDownTimer = ({
  seconds,
  setSeconds,
  mode,
  isTestRunning,
}: CountDownTimerProps) => {
  const formatTime = () => {
    if (mode === "timed") {
      if (seconds >= 0 && seconds <= 9) {
        return `0:0${seconds}`;
      }
      return `0:${seconds}`;
    } else if (mode === "passage") {
      if (mode === "passage") {
        const minute = Math.trunc(seconds / 60);
        const sec = seconds % 60;
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
          setSeconds((prevSeconds) => {
            if (mode === "timed") {
              if (prevSeconds <= 0) {
                clearInterval(intervalId);
                return 0;
              }
              return prevSeconds - 1;
            } else {
              return prevSeconds + 1;
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

  useEffect(() => {
    const changeMode = () => {
      if (mode === "timed") {
        setSeconds(60);
      } else if (mode === "passage") {
        setSeconds(0);
      }
    };
    changeMode();
  }, [mode]);

  return (
    <span
      className={
        isTestRunning ? "font-bold text-yellow-400" : "text-neutral-50"
      }
    >
      {formatTime()}
    </span>
  );
};
export default CountDownTimer;
