import { useLocation, useOutletContext } from "react-router";
import { Link } from "react-router";
import type { Score } from "../../types/typingTypes";
import iconRestart from "../../assets/images/icon-restart-black.svg";
import iconCompleted from "../../assets/images/icon-completed.svg";
import iconNew from "../../assets/images/icon-new-pb.svg";
import iconConfetti from "../../assets/images/pattern-confetti.svg";
import { useEffect } from "react";

type BestScoreProps = {
  bestScore: number | null;
  setBestScore: React.Dispatch<React.SetStateAction<number | null>>;
};

const ResultPage = () => {
  const location = useLocation();
  const homePageState: Score | null = location?.state;
  const { bestScore, setBestScore }: BestScoreProps = useOutletContext();

  const calculateScoreStatus = (
    currentScore: number | undefined,
    previousScore: null | number,
  ) => {
    if (currentScore) {
      if (!previousScore) {
        return "baseLineResult";
      } else if (currentScore > previousScore) {
        return "newBestResult";
      } else {
        return "result";
      }
    }
  };

  const scoreStatus = calculateScoreStatus(homePageState?.wpm, bestScore);

  return (
    <div>
      {homePageState && (
        <div>
          {scoreStatus === "baseLineResult" && (
            <section>
              <div className="mx-auto mt-10 max-w-xl px-2">
                <div className="best-score-container">
                  <img className="w-20" src={iconCompleted} alt="Check mark" />
                  <h3 className="text-3xl font-bold text-neutral-100">
                    Baseline Established!
                  </h3>
                  <p className="leading-5 text-neutral-400">
                    You’ve set the bar. Now the real challenge begins—time to
                    beat it.
                  </p>
                </div>
              </div>
            </section>
          )}

          {scoreStatus === "result" && (
            <section>
              <div className="mx-auto mt-10 max-w-xl px-2">
                <div className="best-score-container">
                  <img className="w-20" src={iconCompleted} alt="Check mark" />
                  <h3 className="text-3xl font-bold text-neutral-100">
                    Test Complete!
                  </h3>
                  <p className="leading-5 text-neutral-400">
                    Solid run. Keep pushing to beat your high score.
                  </p>
                </div>
              </div>
            </section>
          )}

          {scoreStatus === "newBestResult" && (
            <section>
              <div className="mx-auto mt-10 max-w-xl px-2">
                <div className="best-score-container">
                  <img className="w-20" src={iconNew} alt="Celebration" />
                  <h3>High Score Smashed!</h3>
                  <p>You’re getting faster. That was incredible typing.</p>
                </div>
              </div>
            </section>
          )}
          <section id="scoreboard">
            <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center space-y-4 px-2 text-xl sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1 rounded-xl border border-neutral-700 p-3">
                <div className="text-neutral-400">WPM:</div>
                <div className="font-bold text-neutral-100">
                  {homePageState.wpm}
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-neutral-700 p-3">
                <div className="text-neutral-400">Accuracy:</div>
                <div className="font-bold text-red-500">
                  {homePageState.accuracy}%
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-neutral-700 p-3">
                <div className="text-neutral-400">Characters:</div>
                <div className="font-bold text-neutral-500">
                  <span className="text-green-500">
                    {homePageState.characters.correct}
                  </span>
                  /
                  <span className="text-red-500">
                    {homePageState.characters.incorrect}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto mt-10 w-30">
            <Link
              className="flex items-center justify-center space-x-2 rounded-xl bg-neutral-100 p-2 text-neutral-900 hover:cursor-pointer hover:opacity-80"
              to="/"
            >
              <span className="font-bold">Go Again</span>
              <img className="w-4" src={iconRestart} alt="Restart" />
            </Link>
          </div>

          {scoreStatus === "newBestResult" && (
            <div className="mt-10">
              <img
                src={iconConfetti}
                className="w-full"
                alt="celebrate with confetti"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ResultPage;
