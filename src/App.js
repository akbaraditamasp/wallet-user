import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Panel from "./components/Panel";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import { CookiesProvider } from "react-cookie";
import TopUp from "./pages/TopUp";
import Frame from "./pages/Frame";
import Send from "./pages/Send";
import Pin from "./pages/Pin";
import Detail from "./pages/Detail";
import Withdraw from "./pages/Withdraw";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pin",
        element: <Pin />,
      },
      {
        path: "panel",
        element: <Panel />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "topup",
            element: <TopUp />,
          },
          {
            path: "frame",
            element: <Frame />,
          },
          {
            path: "send",
            element: <Send />,
          },
          {
            path: "pin",
            element: <Pin />,
          },
          {
            path: "withdraw",
            element: <Withdraw />,
          },
          {
            path: "detail/:id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}
