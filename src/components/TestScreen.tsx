import { useEffect, useRef, useState } from "react";
import IconRestart from "../assets/images/icon-restart.svg";

type TestScreenProps = {
  question: string;
  isTestRunning: boolean;
  setIsTestRunning: React.Dispatch<React.SetStateAction<boolean>>;
};
const TestScreen = ({
  question,
  isTestRunning,
  setIsTestRunning,
}: TestScreenProps) => {
  const questionEl = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);

  // Add trailing space for cursor visibility and display last character verification.
  const breakQuestion = question && (question + " ").split("");

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (breakQuestion.length) {
      if (e.key === "Backspace" && quizIndex > 0) {
        setQuizIndex(quizIndex - 1);
        setUserInput(userInput.slice(0, -1));
        return;
      } else if (e.key === "Backspace" && quizIndex === 0) {
        setQuizIndex(0);
        return;
      } else if (quizIndex < breakQuestion.length - 1) {
        setQuizIndex(quizIndex + 1);
        setUserInput(userInput.concat(e.key));
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
      if (breakQuestion[letterIndex] === userInput[letterIndex]) {
        return "text-green-500";
      } else if (breakQuestion[letterIndex] !== userInput[letterIndex]) {
        return "text-red-500 border-b-red-500";
      }
    }
  };

  useEffect(() => {
    if (isTestRunning && questionEl.current) {
      questionEl.current.focus();
    }
  }, [isTestRunning]);

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

      <div
        onKeyDown={handleUserKeyPress}
        ref={questionEl}
        tabIndex={1}
        className="h-full py-4 text-2xl sm:py-6 sm:text-4xl"
      >
        {breakQuestion && (
          <div className="text-neutral-400">
            {breakQuestion.map((l, index) => (
              <span
                key={index}
                className={`${questionLetterClass(index, quizIndex)} border-b-2 border-transparent transition duration-100`}
              >
                {l}
              </span>
            ))}
          </div>
        )}

        <hr className="my-4 text-neutral-700 opacity-40 sm:my-6" />
        {isTestRunning && (
          <button className="mx-auto flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2 text-lg text-white hover:cursor-pointer">
            <span>Restart Test </span>
            <img className="w-4" src={IconRestart} alt="Restart test" />
          </button>
        )}
      </div>
    </div>
  );
};
export default TestScreen;
