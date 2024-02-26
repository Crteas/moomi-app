import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import DollList from "./routes/DollList";
import DollDetail from "./routes/DollDetail";
import DollRegist from "./routes/DollRegist";
import LoginPage from "./routes/LoginPage";
import Home from "./routes/Home";
import CreateAccount from "./routes/CreateAccount";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected-route";
import Cloth from "./routes/Cloth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cloth",
        element: <Cloth />,
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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

export default router;
