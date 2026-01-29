import { useEffect } from "react";
import iconPersonalBest from "../assets/images/icon-personal-best.svg";

type PersonalBestProps = {
  bestScore: number | null;
  setBestScore: React.Dispatch<React.SetStateAction<number | null>>;
};

const PersonalBest = ({ bestScore, setBestScore }: PersonalBestProps) => {
  useEffect(() => {
    window.localStorage.setItem(
      "typingSpeedTestAppScore",
      JSON.stringify(bestScore),
    );
    const saveScore = window.localStorage.getItem("typingSpeedTestAppScore");

    if (saveScore) {
      const score = JSON.parse(saveScore);
      setBestScore(score);
    }
  }, [bestScore]);

  return (
    <>
      {bestScore && (
        <div className="flex gap-2">
          <img className="w-5" src={iconPersonalBest} alt="trophy" />
          <div className="flex">
            <div className="text-neutral-400">
              <span className="hidden sm:inline">Personal</span>
              <span className="capitalize sm:lowercase"> Best</span>:
            </div>
            <span className="text-neutral-100">{bestScore} WPM</span>
          </div>
        </div>
      )}
    </>
  );
};
export default PersonalBest;
