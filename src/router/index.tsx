import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import { PlanetDetails } from "../views/PlanetDetails";
import { MainLayout } from "../layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: "/:id",
    element: (
      <MainLayout>
        <PlanetDetails />
      </MainLayout>
    )
  }
]);
