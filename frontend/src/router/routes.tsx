import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../shared/components/layouts/AppLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Login from "../features/dashboard/pages/Login";

export default createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);
