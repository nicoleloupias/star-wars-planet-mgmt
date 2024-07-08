import { Box, Center, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { PlanetCard } from "./components/PlanetCard";
import { Planet, usePlanetsStore } from "../../hooks/usePlanetsStore";
import { Hero } from "./components/Hero";
import { useMemo, useState } from "react";
import { InputController } from "../../components/InputController";
import { useForm } from "react-hook-form";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

export const Home = () => {
  const planets = usePlanetsStore((state) => state.planets);
  const [searchResults, setSearchResults] = useState<Planet[]>();
  const { control, watch, resetField } = useForm();

  const searchValue = watch("search");

  const handleSearchPlanet = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const result = planets?.filter((planet) => {
      if (!searchValue) return planet;

      return [planet.name.toLowerCase(), planet.climate.toLowerCase(), planet.terrain.toLowerCase()].includes(
        searchValue
      );
    });

    setSearchResults(result);
  };

  const handleResetSearch = () => {
    resetField("search");
    setSearchResults(undefined);
  };

  const planetsToShow = useMemo(() => {
    if (searchResults && watch("search")) return searchResults;
    return planets;
  }, [planets, searchResults]);

  return (
    <>
      <Hero />
      <Center flexDir="column">
        <Box minW={{ lg: "1040px" }} mt={10}>
          <Flex as="form" maxW={80}>
            <InputController
              id="search"
              label="Search"
              control={control}
              iconRight={
                <Flex gap={2} mr={6}>
                  {watch("search") && (
                    <IconButton
                      onClick={handleResetSearch}
                      minW={4}
                      size="xs"
                      variant="transparent"
                      aria-label="Remove search"
                      icon={<CloseIcon />}
                    />
                  )}
                  <IconButton
                    onClick={handleSearchPlanet}
                    minW={4}
                    type="submit"
                    size="xs"
                    variant="transparent"
                    aria-label="Search"
                    icon={<SearchIcon />}
                  />
                </Flex>
              }
            />
          </Flex>
          <SimpleGrid my={20} columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
            {planetsToShow && planetsToShow?.map((planet) => <PlanetCard key={planet.id} {...planet} />)}
            {watch("search") && planetsToShow?.length === 0 && <Text>There are no results with this search</Text>}
          </SimpleGrid>
        </Box>
      </Center>
    </>
  );
};
