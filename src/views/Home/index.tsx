import { Center, SimpleGrid } from "@chakra-ui/react";
import { PlanetCard } from "../../components/PlanetCard";
import { usePlanetsStore } from "../../hooks/usePlanetsStore";
import { Hero } from "./Hero";

export const Home = () => {
  const planets = usePlanetsStore((state) => state.planets);

  return (
    <>
      <Hero />
      <Center>
        <SimpleGrid mt={20} columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          {planets && planets?.map((planet) => <PlanetCard key={planet.id} {...planet} />)}
        </SimpleGrid>
      </Center>
    </>
  );
};
