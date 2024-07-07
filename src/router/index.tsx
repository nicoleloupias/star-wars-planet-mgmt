import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home/Home";
import { PlanetDetails } from "../views/Planet/PlanetDetails/PlanetDetails";
import { MainLayout } from "../layout/MainLayout";
import { CreatePlanet } from "../views/Planet/CreatePlanet/CreatePlanet";
import { EditPlanet } from "../views/Planet/EditPlanet/EditPlanet";

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
