import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import { PlanetDetails } from "../views/Planet/PlanetDetails";
import { MainLayout } from "../layout/MainLayout";
import { CreatePlanet } from "../views/Planet/CreatePlanet";
import { EditPlanet } from "../views/Planet/EditPlanet";

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
  },
  {
    path: "/create",
    element: (
      <MainLayout>
        <CreatePlanet />
      </MainLayout>
    )
  },
  {
    path: "/:id/edit",
    element: (
      <MainLayout>
        <EditPlanet />
      </MainLayout>
    )
  }
]);
