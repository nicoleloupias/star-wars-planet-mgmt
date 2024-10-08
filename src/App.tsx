import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { theme } from "./theme";
import { useEffect } from "react";
import { usePlanetsStore } from "./hooks/usePlanetsStore";
import { PlanetService } from "./services/PlanetService";

function App() {
  const planets = usePlanetsStore((state) => state.planets);
  const setPlanets = usePlanetsStore((state) => state.setPlanets);

  const getAllPlanets = async () => {
    const planets = await PlanetService.getAll();
    if (planets) setPlanets(planets);
  };

  useEffect(() => {
    if (!planets) {
      getAllPlanets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets]);

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
