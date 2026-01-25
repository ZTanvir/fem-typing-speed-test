import { Outlet } from "react-router";
import Logo from "../components/Logo";
import PersonalBest from "../components/PersonalBest";

const MainLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-neutral-900 px-2 py-2">
      <header className="flex items-start justify-between">
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
