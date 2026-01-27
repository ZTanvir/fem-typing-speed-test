import { Outlet } from "react-router";
import Logo from "../components/Logo";
import PersonalBest from "../components/PersonalBest";

const MainLayout = () => {
  return (
    <div className="font-sora grid h-screen grid-rows-[auto_1fr] bg-neutral-900 py-4">
      <header className="flex items-start justify-between px-2">
        <Logo />
        <PersonalBest />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
