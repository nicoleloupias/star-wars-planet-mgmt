import { Box, Flex, IconButton } from "@chakra-ui/react";
import { InputController } from "../../../components/InputController";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import type { Planet } from "../../../hooks/usePlanetsStore";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import type { UseFormReturn } from "react-hook-form";

export interface SearchBarProps {
  setPlanetsToShow: React.Dispatch<React.SetStateAction<Planet[] | undefined>>;
  form: UseFormReturn<{
    search: string;
    sortBy: "name" | "diameter" | "climate" | "terrain" | "population";
  }>;
}

export const SearchBar = ({ form, setPlanetsToShow }: SearchBarProps) => {
  const { watch, control, resetField } = form;
  const planets = usePlanetsStore((state) => state.planets);
  const searchValue = watch("search");
  const handleSearchPlanet = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const result = planets?.filter((planet) => {
      if (!searchValue) return planet;

      return (
        planet.name.toLowerCase().includes(searchValue) ||
        planet.climate.toLowerCase().includes(searchValue) ||
        planet.terrain.toLowerCase().includes(searchValue)
      );
    });

    setPlanetsToShow(result);
  };

  const handleResetSearch = () => {
    resetField("search");
    setPlanetsToShow([...(planets ?? [])]);
  };
  return (
    <Box maxW={80}>
      <InputController
        id="search"
        showLabel={false}
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
    </Box>
  );
};
