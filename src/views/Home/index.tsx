import { useEffect, useState } from "react";
import { PlanetService } from "../../services/PlanetService";
import { Box, Button, Center, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { PlanetCard } from "../../components/PlanetCard";
import { usePlanetsStore } from "../../hooks/usePlanetsStore";

export const Home = () => {
  const planets = usePlanetsStore((state) => state.planets);
  const setPlanets = usePlanetsStore((state) => state.setPlanets);
  const getAllPlanets = async () => {
    const planets = await PlanetService.getAll();

    setPlanets(planets);
  };

  useEffect(() => {
    if (planets.length === 0) {
      getAllPlanets();
    }
  }, []);

  return (
    <Center>
      <SimpleGrid mt={20} columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
        {planets.length > 0 && planets?.map((planet) => <PlanetCard key={planet.url} {...planet} />)}
      </SimpleGrid>
    </Center>
  );
};
