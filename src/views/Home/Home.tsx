import { Box, Button, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { PlanetCard } from "./components/PlanetCard";
import type { Planet } from "../../hooks/usePlanetsStore";
import { usePlanetsStore } from "../../hooks/usePlanetsStore";
import { Hero } from "./components/Hero";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SortBy } from "./components/SortBy";
import { SearchBar } from "./components/SearchBar";
import { usePagination } from "../../hooks/usePagination";

export interface FormFieldValues {
  search: string;
  sortBy: "name" | "diameter" | "climate" | "terrain" | "population";
}

export const Home = () => {
  const planets = usePlanetsStore((state) => state.planets);
  const [planetsToShow, setPlanetsToShow] = useState<Planet[] | undefined>();
  const { data: paginatedPlanets, onNextPage, onPrevPage, hasPrevPage, hasNextPage } = usePagination(planetsToShow);
  const form = useForm<FormFieldValues>();

  useEffect(() => {
    if (planets) {
      setPlanetsToShow([...planets]);
    }
  }, [planets]);

  return (
    <>
      <Hero />
      <Center flexDir="column">
        <Box as="section" minW={{ lg: "1040px" }} my={10}>
          <Flex as="form" gap={2} justifyItems="flex-start" flexDir={{ base: "column", lg: "row" }}>
            <SearchBar setPlanetsToShow={setPlanetsToShow} form={form} />
            <SortBy setPlanetsToShow={setPlanetsToShow} planetsToShow={planetsToShow} form={form} />
          </Flex>

          <SimpleGrid my={20} columns={{ base: 1, md: 2, lg: 3 }} gap={10} justifyItems="center">
            {planetsToShow &&
              paginatedPlanets?.map(({ id, climate, diameter, name, terrain, population }) => (
                <PlanetCard
                  key={id}
                  diameter={diameter}
                  id={id}
                  climate={climate}
                  name={name}
                  terrain={terrain}
                  population={population}
                />
              ))}
            {form.watch("search") && planetsToShow?.length === 0 && <Text>There are no results with this search</Text>}
          </SimpleGrid>

          <Button variant="secondary" isDisabled={!hasPrevPage} onClick={onPrevPage}>
            Prev
          </Button>
          <Button ml={3} variant="secondary" isDisabled={!hasNextPage} onClick={onNextPage}>
            Next
          </Button>
        </Box>
      </Center>
    </>
  );
};
