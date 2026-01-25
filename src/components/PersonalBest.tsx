import { useEffect, useState } from "react";
import iconPersonalBest from "../assets/images/icon-personal-best.svg";
const PersonalBest = () => {
  const [bestScore, setBestScore] = useState<null | number>(() => {
    const score = JSON.parse(
      window.localStorage.getItem("typingSpeedTestAppScore") || "null",
    );
    if (score) {
      return score;
    }
    window.localStorage.setItem(
      "typingSpeedTestAppScore",
      JSON.stringify(null),
    );
    return null;
  });
  useEffect(() => {
    window.localStorage.setItem(
      "typingSpeedTestAppScore",
      JSON.stringify(bestScore),
    );
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
