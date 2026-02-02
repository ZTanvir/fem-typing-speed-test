import { useEffect, useRef, useState } from "react";
import IconRestart from "../assets/images/icon-restart.svg";
import { useNavigate } from "react-router";
import helperFunctions from "../utils/helperFunctions";

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

  const breakQuestion = question && question.split("");

  const calculateWpm = (seconds: number, totalKeyPressed: number) => {
    if (seconds <= 0) return 0;

    const words = totalKeyPressed / 5;
    const minutes = seconds / 60;
    const wpm = Math.round(words / minutes);
    return wpm;
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!breakQuestion) return;

    const newValue = e.target.value;
    const newValueArray = newValue.split("");

    setUserInput(newValueArray);
    setQuizIndex(newValueArray.length);

    const totalKeyPressed = newValueArray.length;
    if (totalKeyPressed === 0) return;

    // wpm
    const timeElapsed = mode === "timed" ? 60 - seconds : seconds;
    const currentWpm = calculateWpm(timeElapsed, totalKeyPressed);
    setWpm(currentWpm);

    // accuracy
    const correctCount = newValueArray.reduce((acc, char, index) => {
      return char === breakQuestion[index] ? acc + 1 : acc;
    }, 0);

    const currentAccuracy = Math.trunc((correctCount / totalKeyPressed) * 100);
    setAccuracy(currentAccuracy);

    // check for completion
    if (totalKeyPressed === breakQuestion.length) {
      const [correct, incorrect] =
        helperFunctions.countCorrectIncorrectKeyPressed(
          breakQuestion,
          newValueArray,
        );
      navigate("/result", {
        state: {
          wpm: currentWpm,
          accuracy: currentAccuracy,
          characters: { correct, incorrect },
        },
      });
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
    if (textAreaEl.current) {
      textAreaEl.current.value = "";
    }
    setQuizIndex(0);
    setUserInput([]);
    setAccuracy(100);
    setWpm(0);
    setIsTestRunning(false);

    if (mode === "timed") {
      setSeconds(60);
    } else if (mode === "passage") {
      setSeconds(0);
    }
  };

  useEffect(() => {
    if (isTestRunning && textAreaEl.current) {
      textAreaEl.current.focus();
    }
  });

  useEffect(() => {
    function calculateResult() {
      if (mode === "timed" && seconds === 0) {
        if (breakQuestion) {
          const [correctKeyPressed, incorrectKeyPressed] =
            helperFunctions.countCorrectIncorrectKeyPressed(
              breakQuestion,
              userInput,
            );

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
              className="absolute top-0 z-[-1] h-0 w-0 bg-transparent"
              name="userInput"
              id="userInput"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              autoComplete="off"
              ref={textAreaEl}
              onChange={handleUserInput}
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
