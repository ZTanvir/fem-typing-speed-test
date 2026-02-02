import { useEffect, useRef, useState } from "react";
import IconRestart from "../assets/images/icon-restart.svg";
import { useNavigate } from "react-router";

type TestScreenProps = {
  question: string | null;
  isTestRunning: boolean;
  setIsTestRunning: React.Dispatch<React.SetStateAction<boolean>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  wpm: number;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  accuracy: number;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  mode: string;
};
const TestScreen = ({
  question,
  isTestRunning,
  seconds,
  setIsTestRunning,
  setSeconds,
  wpm,
  setWpm,
  accuracy,
  setAccuracy,
  mode,
}: TestScreenProps) => {
  const textAreaEl = useRef<HTMLTextAreaElement>(null);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const navigate = useNavigate();

  // Add trailing space for cursor visibility and display last character verification.
  const breakQuestion = question && (question + " ").split("");

  const calculateWpm = (seconds: number, totalKeyPressed: number) => {
    if (seconds <= 0) {
      return 0;
    }
    const words = totalKeyPressed / 5;
    const minutes = seconds / 60;
    const wpm = Math.round(words / minutes);
    return wpm;
  };

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (breakQuestion && breakQuestion.length) {
      if (e.key === "Backspace" && quizIndex > 0) {
        setQuizIndex(quizIndex - 1);
        setUserInput(userInput.slice(0, -1));
        return;
      } else if (e.key === "Backspace" && quizIndex === 0) {
        setQuizIndex(0);
        return;
      } else if (e.key === "CapsLock") {
        return;
      } else if (quizIndex < breakQuestion.length - 1) {
        setQuizIndex(quizIndex + 1);
        setUserInput(userInput.concat(e.key));
        /*
          Total Number of Words = Total Keys Pressed / 5
          WPM = Total Number of Words / Time Elapsed in Minutes (rounded down)
        */

        const totalKeyPressed = userInput.length + 1;

        if (mode === "timed") {
          const initialTime = 60;
          const timeElapsed = initialTime - seconds;
          const updatedWpm = calculateWpm(timeElapsed, totalKeyPressed);
          setWpm(updatedWpm);
        } else if (mode === "passage") {
          const updatedWpm = calculateWpm(seconds, totalKeyPressed);
          setWpm(updatedWpm);
        }

        /*
        Accuracy = (Correct Keys Pressed /  Total Keys Pressed) * 100 = Accuracy%
        */
        let correctKeyPressed = 0;
        // key pressed at the moment
        if (e.key === breakQuestion[quizIndex]) {
          correctKeyPressed += 1;
        }
        // all key pressed in the past
        for (let index = 0; index < breakQuestion.length - 1; index++) {
          if (breakQuestion[index] === userInput[index]) {
            correctKeyPressed += 1;
          }
        }

        const accuracy = Math.trunc(
          (correctKeyPressed / totalKeyPressed) * 100,
        );
        setAccuracy(accuracy);
      }
      // check for typed completion
      if (quizIndex === breakQuestion.length - 2) {
        let correctKeyPressed = 0;
        let incorrectKeyPressed = 0;
        for (let index = 0; index < breakQuestion.length - 1; index++) {
          if (breakQuestion[index] === userInput[index]) {
            correctKeyPressed += 1;
          } else {
            incorrectKeyPressed += 1;
          }
        }
        // send score data to /result page
        navigate("/result", {
          state: {
            wpm,
            accuracy,
            characters: {
              correct: correctKeyPressed,
              incorrect: incorrectKeyPressed,
            },
          },
        });
      }
    }
  };

  const questionLetterClass = (
    letterIndex: number,
    currentLetterPositionIndex: number,
  ) => {
    if (letterIndex === currentLetterPositionIndex) {
      return "rounded bg-neutral-700 p-0.5 ";
    } else if (letterIndex < currentLetterPositionIndex) {
      if (breakQuestion) {
        if (breakQuestion[letterIndex] === userInput[letterIndex]) {
          return "text-green-500";
        } else if (breakQuestion[letterIndex] !== userInput[letterIndex]) {
          return "text-red-500 border-b-red-500";
        }
      }
    }
  };

  const handleRestartTestBtn = () => {
    setQuizIndex(0);
    setUserInput([]);
    setAccuracy(100);
    setWpm(0);

    if (mode === "timed") {
      setSeconds(60);
    } else if (mode === "passage") {
      setSeconds(0);
    }
  };

  useEffect(() => {
    console.log("is test running", isTestRunning);
    if (isTestRunning && textAreaEl.current) {
      textAreaEl.current.focus();
    }
  });

  useEffect(() => {
    function calculateResult() {
      if (mode === "timed" && seconds === 0) {
        if (breakQuestion) {
          let correctKeyPressed = 0;
          let incorrectKeyPressed = 0;
          for (let index = 0; index < breakQuestion.length - 1; index++) {
            if (breakQuestion[index] === userInput[index]) {
              correctKeyPressed += 1;
            } else {
              incorrectKeyPressed += 1;
            }
          }
          navigate("/result", {
            state: {
              wpm,
              accuracy,
              characters: {
                correct: correctKeyPressed,
                incorrect: incorrectKeyPressed,
              },
            },
          });
        }
      }
    }
    calculateResult();
  }, [seconds]);

  return (
    <div className="relative h-full">
      {!isTestRunning && (
        <div className="absolute z-1 flex h-full w-full flex-col items-center justify-center gap-1 backdrop-blur-[5px]">
          <button
            onClick={() => setIsTestRunning(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-neutral-50 hover:cursor-pointer"
          >
            Start Typing Test
          </button>
          <p className="text-center text-sm text-neutral-50 sm:text-base">
            Or click the text and start typing
          </p>
        </div>
      )}

      <div className="h-full py-4 text-2xl sm:py-6 sm:text-4xl">
        {breakQuestion && (
          <div>
            <textarea
              className="absolute top-0 z-[-1] h-0 w-0 opacity-0"
              name="userInput"
              id="userInput"
              ref={textAreaEl}
              onKeyDown={handleUserKeyPress}
            ></textarea>
            <div className="px-2 text-neutral-400">
              {breakQuestion.map((l, index) => (
                <span
                  key={index}
                  className={`${questionLetterClass(index, quizIndex)} border-b-2 border-transparent transition duration-100`}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        <hr className="my-4 text-neutral-700 opacity-40 sm:my-6" />
        {isTestRunning && (
          <button
            onClick={handleRestartTestBtn}
            className="mx-auto flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2 text-lg text-white hover:cursor-pointer"
          >
            <span>Restart Test </span>
            <img className="w-4" src={IconRestart} alt="Restart test" />
          </button>
        )}
      </div>
    </div>
  );
};
export default TestScreen;
