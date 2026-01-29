import { Outlet } from "react-router";
import Logo from "../components/Logo";
import PersonalBest from "../components/PersonalBest";
import { useState } from "react";

const MainLayout = () => {
  const [bestScore, setBestScore] = useState<null | number>(() => {
    const score = window.localStorage.getItem("typingSpeedTestAppScore");

    if (score) {
      return JSON.parse(score);
    }
    window.localStorage.setItem(
      "typingSpeedTestAppScore",
      JSON.stringify(null),
    );
    return null;
  });

  return (
    <div className="font-sora grid h-screen grid-rows-[auto_1fr] bg-neutral-900 py-4">
      <header className="flex items-start justify-between px-2">
        <Logo />
        <PersonalBest bestScore={bestScore} setBestScore={setBestScore} />
      </header>
      <main>
        <Outlet context={{ bestScore, setBestScore }} />
      </main>
    </div>
  );
};
export default MainLayout;
