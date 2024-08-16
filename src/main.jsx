import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./components/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-xl mx-auto">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </div>
);
