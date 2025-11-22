import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CarsDetail from "../pages/CarsDetail";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cars/:id",
    element: <CarsDetail />,
  },
]);
