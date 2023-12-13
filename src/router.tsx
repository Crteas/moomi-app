import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import DollList from "./components/DollList";
import DollDetail from "./components/DollDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DollList />,
      },
      {
        path: "/doll/:id",
        element: <DollDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
