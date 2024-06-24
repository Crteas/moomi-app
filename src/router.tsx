import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./routes/LoginPage";
import Home from "./routes/Home";
import CreateAccount from "./routes/CreateAccount";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected-route";
import GBItemForm from "./routes/GBItemForm";
import GBItemList from "./routes/GBItemList";
import GBItemDetail from "./routes/GBItemDetail";

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
        path: "/addGBitem",
        element: <GBItemForm />,
      },
      {
        path: "/GBlist",
        element: <GBItemList />,
      },
      {
        path: "/GBitem/:id",
        element: <GBItemDetail />,
      },
      {
        path: "/GBitem/:id/edit",
        element: <GBItemForm />,
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
