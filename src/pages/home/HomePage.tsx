import { useEffect, useState } from "react";
import OptionList from "../../components/OptionList";
import CountDownTimer from "../../components/CountDownTimer";
import TestScreen from "../../components/TestScreen";
import helperFunctions from "../../utils/helperFunctions";
import ScoreData from "../../components/ScoreData";
import Divider from "../../components/Divider";
import type { Question } from "../../types/api";

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed");
  const [question, setQuestion] = useState<null | string>(null);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    async function fetchQuestion(difficultyType: string) {
      // assign fetchUrl address based on localhost or vercel address
      // const fetchUrl = `${import.meta.env.DEV ? `http://localhost:3000/${difficultyType}` : "/data/db.json"}`;
      const fetchUrl = "https://fem-typing-speed-test.vercel.app/data/db.json";
      const response = await fetch(`${fetchUrl}`);

      if (response.ok) {
        const data = await response.json();
        // in server /data/db.json/difficultyType not accessible
        // data = import.meta.env.DEV ? data : data[difficultyType];
        // data = import.meta.env.DEV ? data : data[difficultyType];
        const shuffledData: Question[] = helperFunctions.shuffle(
          data[difficultyType],
        );
        if (shuffledData.length > 0) {
          setQuestion(shuffledData[0].text);
        }
      }
    }
    fetchQuestion(difficulty);
  }, [difficulty]);

  return (
    <div className="grid h-full grid-rows-[auto_1fr] pt-5">
      <div className="mb-2 flex flex-col gap-2 px-2 sm:flex-row sm:flex-wrap sm:justify-between">
        <div className="flex justify-between gap-2 sm:text-xl">
          <ScoreData name="WPM:">
            <div className="font-bold text-neutral-100">{wpm}</div>
          </ScoreData>

          <Divider />
          <ScoreData name="Accuracy:">
            <div
              className={`font-bold text-neutral-100 ${isTestRunning && "text-red-500"}`}
            >
              {accuracy}%
            </div>
          </ScoreData>
          <Divider />
          <ScoreData name="Time:">
            <CountDownTimer
              seconds={seconds}
              setSeconds={setSeconds}
              mode={mode}
              isTestRunning={isTestRunning}
            />
          </ScoreData>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 items-center gap-1">
            <div className="hidden text-neutral-400 sm:flex">Difficulty:</div>
            <OptionList
              option={difficulty}
              setOptions={setDifficulty}
              options={[
                { value: "easy", text: "easy" },
                { value: "medium", text: "medium" },
                { value: "hard", text: "hard" },
              ]}
              isTestRunning={isTestRunning}
            />
          </div>
          <div className="hidden md:block">
            <Divider />
          </div>
          <div className="flex flex-1 gap-1 md:items-center">
            <div className="hidden text-neutral-400 sm:flex">Time:</div>
            <OptionList
              option={mode}
              setOptions={setMode}
              options={[
                { value: "timed", text: "timed(60s)" },
                { value: "passage", text: "passage" },
              ]}
              isTestRunning={isTestRunning}
            />
          </div>
        </div>
      </div>
      <>
        <TestScreen
          question={question}
          isTestRunning={isTestRunning}
          setIsTestRunning={setIsTestRunning}
          setSeconds={setSeconds}
          mode={mode}
          wpm={wpm}
          setWpm={setWpm}
          seconds={seconds}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
        />
      </>
    </div>
  );
};
export default HomePage;
