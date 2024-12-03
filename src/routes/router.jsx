import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
const Calendar = lazy(() => import("@/pages/Calendar"));
import Loader from "@/components/Loader";
const Chart = lazy(() => import("@/pages/Chart"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<Loader />}>
          <Calendar />
        </Suspense>,
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
