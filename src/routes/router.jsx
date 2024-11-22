import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Calendar from "@/pages/Calendar";
import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";
const Chart = lazy(() => import("@/pages/Chart"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Calendar />,
      },
      {
        path: "/chart",
        element: <Suspense fallback={<Loader />}>
          <Chart />
        </Suspense>,
      }
    ],
  },
]);
