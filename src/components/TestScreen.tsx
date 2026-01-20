import { useEffect, useRef } from "react";
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
  console.log(question.split(""));

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    console.log(e.key);
  };

  useEffect(() => {
    if (isTestRunning && questionEl.current) {
      questionEl.current.focus();
    }
  }, [isTestRunning]);

  return (
    <div className="relative">
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
        className="py-4 text-2xl sm:py-6 sm:text-4xl"
      >
        {question}

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
