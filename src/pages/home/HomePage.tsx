import { useEffect, useState } from "react";
import OptionList from "../../components/OptionList";
import CountDownTimer from "../../components/CountDownTimer";
import TestScreen from "../../components/TestScreen";
import helperFunctions from "../../utils/helperFunctions";
import type { Question } from "../../types/api";

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed");
  const [question, setQuestion] = useState<null | string>(null);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    async function fetchQuestion(difficultyType: string) {
      const response = await fetch(`http://localhost:3000/${difficultyType}`);

      if (response.ok) {
        const data = await response.json();

        const shuffledData: Question[] = helperFunctions.shuffle(data);
        if (shuffledData.length > 0) {
          setQuestion(shuffledData[0].text);
        }
      }
    }
    fetchQuestion(difficulty);
  }, [difficulty]);

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <div>
        <div>
          <CountDownTimer
            seconds={seconds}
            setSeconds={setSeconds}
            mode={mode}
            isTestRunning={isTestRunning}
          />
        </div>
        <div className="">
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
      <>
        <TestScreen
          question={question}
          isTestRunning={isTestRunning}
          setIsTestRunning={setIsTestRunning}
          setSeconds={setSeconds}
          mode={mode}
        />
      </>
    </div>
  );
};
export default HomePage;
