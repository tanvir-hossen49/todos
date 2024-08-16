import { CheckCircle } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <nav className="flex justify-between">
        <div className="flex items-center gap-3">
          <span>
            <CheckCircle />
          </span>
          <h1 className="text-3xl font-bold">Track Your Activity</h1>
        </div>
        <ModeToggle />
      </nav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
