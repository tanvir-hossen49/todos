import { CheckCircle } from "lucide-react";
import { ModeToggle } from "../components/ModeToggle";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import WeekNavigatorSkeleton from "@/components/Skeleton/WeekNavigatorSkeleton";

const WeekNavigator = lazy(() => import("@/components/WeekNavigator"));

const MainLayout = () => {
  return (
    <>
      <nav className="flex justify-between">
        <div className="flex items-center gap-3">
          <span>
            <CheckCircle />
          </span>
          <Link to="/" className="text-3xl font-bold">Track Your Activities</Link>
        </div>
        <ModeToggle />
      </nav>
      
      <Suspense fallback={<WeekNavigatorSkeleton />}>
        <WeekNavigator />
      </Suspense>

      <section>
        <Outlet />
      </section>

      <Toaster/>
    </>
  );
};

export default MainLayout;
