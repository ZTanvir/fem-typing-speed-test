import { useLocation, useOutletContext } from "react-router";
import type { Score } from "../../types/typingTypes";
import iconRestart from "../../assets/images/icon-restart-black.svg";
import { Link } from "react-router";

const ResultPage = () => {
  const location = useLocation();
  const homePageState: Score | null = location?.state;
  const { bestScore, setBestScore } = useOutletContext();

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
  console.log(scoreStatus);
  return (
    <div>
      {homePageState && (
        <>
          <section id="scoreboard">
            <div className="mx-auto flex max-w-xl flex-col justify-center space-y-4 px-2 text-xl sm:flex-row sm:space-y-0 sm:space-x-4">
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
          <div className="mx-auto mt-5 w-30">
            <Link
              className="flex items-center justify-center space-x-2 rounded-xl bg-neutral-100 p-2 text-neutral-900 hover:cursor-pointer hover:opacity-80"
              to="/"
            >
              <span className="font-bold">Go Again</span>
              <img className="w-4" src={iconRestart} alt="Restart" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default ResultPage;
