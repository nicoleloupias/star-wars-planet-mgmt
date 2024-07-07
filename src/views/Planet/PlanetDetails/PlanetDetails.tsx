import { Box, Button, Center, Circle, Flex, Heading, ListItem, OrderedList, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import stars from "../../../assets/stars.png";
import { useEffect } from "react";
import { getRandomPlanetColor } from "../../../helpers/planet";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ResidentService } from "../../../services/ResidentService";
import { useResidentsStore } from "../../../hooks/useResidentsStore";

export const PlanetDetails = () => {
  const { id } = useParams() as { id: string };
  const planets = usePlanetsStore((store) => store.planets);
  const data = planets?.find((planet) => planet.id === id);
  const removePlanet = usePlanetsStore((store) => store.removePlanet);
  const setResident = useResidentsStore((store) => store.setResident);
  const residents = useResidentsStore((store) => store.residents)?.[id];
  const navigate = useNavigate();
  const toast = useToast();
  const planetColor = getRandomPlanetColor(data?.name);

  const handleRemovePlanet = () => {
    const name = data?.name;
    removePlanet(id);
    navigate("/");
    toast({
      status: "success",
      title: `Success! Planet ${name} was removed from our system.`,
      position: "top-right"
    });
  };

  const getResidentId = (url: string) => {
    const regex = /\/people\/(\d+)\//;
    const test = url.match(regex);
    if (!test) return "-1";
    return test[1];
  };

  const getAllResidents = () => {
    data?.residents.forEach(async (residentUrl) => {
      const residentId = getResidentId(residentUrl);
      const resident = await ResidentService.getById(residentId);

      setResident(id, resident);
    });
  };

  useEffect(() => {
    if (!residents) {
      getAllResidents();
    }
  }, [data]);

  return (
    <Flex w="full" minH="100vh" flexDirection={{ base: "column", lg: "row" }} pt={14}>
      <Center bgImage={`url(${stars})`} bgSize="200px" w="full" flex={2 / 3} py={12}>
        <Circle
          size={{ base: "200px", lg: "400px" }}
          bgColor={planetColor}
          boxShadow={`0px 0px 30px 0px ${planetColor}`}
        />
      </Center>
      <Box w="full" flex={1 / 3}>
        <Box bgColor="red.500" p={6} mb={6}>
          <Heading color="gray.50">Planet: {data?.name}</Heading>
        </Box>
        <Box ml={6}>
          <Text>Diameter: {data?.diameter}</Text>
          <Text>Climate: {data?.climate}</Text>
          <Text>Terrain: {data?.terrain}</Text>
          <Text>Population: {data?.population}</Text>

          <Box mt={4}>
            <Heading as="h3" fontSize="xl">
              Residents
            </Heading>

            {residents?.length > 0 ? (
              <OrderedList>{residents?.map(({ name }, i) => <ListItem key={i}>{name}</ListItem>)}</OrderedList>
            ) : (
              <Text>There are no residents in this planet.</Text>
            )}
          </Box>

          <Flex mt={6} gap={4}>
            <Button variant="secondary" to={`/${id}/edit`} as={Link} rightIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              variant="secondary"
              data-testid="remove-planet-btn"
              onClick={handleRemovePlanet}
              rightIcon={<DeleteIcon />}
            >
              Remove
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
