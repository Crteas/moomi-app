import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import DollList from "./routes/DollList";
import DollDetail from "./routes/DollDetail";
import LoginPage from "./routes/LoginPage";
import Home from "./routes/Home";
import CreateAccount from "./routes/CreateAccount";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected-route";
import ClothList from "./routes/ClothList";
import Regist from "./routes/Regist";
import DollEdit from "./routes/DollEdit";

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
        path: "/closet/list",
        element: <ClothList />,
      },
      { path: "/dolls/list", element: <DollList /> },
      {
        path: "/dolls/:id",
        element: <DollDetail />,
      },
      {
        path: "/dolls/:id/edit",
        element: <DollEdit />,
      },
      {
        path: "/item/regist",
        element: <Regist />,
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
