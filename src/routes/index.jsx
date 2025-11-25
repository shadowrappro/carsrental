import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CarsDetail from "../pages/CarsDetail";
import Edit from "../pages/Edit";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cars/:id",
    element: <CarsDetail />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);
