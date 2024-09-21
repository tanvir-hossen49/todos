import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Chart from "@/pages/Chart";
import Calendar from "@/pages/Calendar";

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
        element: <Chart />,
      }
    ],
  },
]);
