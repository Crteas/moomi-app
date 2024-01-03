import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import DollList from "./components/DollList";
import DollDetail from "./components/DollDetail";
import DollRegist from "./components/DollRegist";

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
      {
        path: "/doll/regist",
        element: <DollRegist />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
