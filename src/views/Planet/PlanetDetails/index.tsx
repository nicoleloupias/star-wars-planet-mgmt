import { Box, Button, Center, Circle, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import stars from "../../../assets/stars.png";
import { useEffect } from "react";
import { getRandomPlanetColor } from "../../../helpers/planet";
import { PlanetService } from "../../../services/PlanetService";

export const PlanetDetails = () => {
  const { id } = useParams();
  const planets = usePlanetsStore((store) => store.planets);
  const data = planets.find((planet) => planet.url.includes(`/${id}/`));
  const setPlanet = usePlanetsStore((store) => store.setPlanet);
  const removePlanet = usePlanetsStore((store) => store.removePlanet);
  const planetColor = getRandomPlanetColor(data?.name);
  const navigate = useNavigate();
  const toast = useToast();

  const getPlanetDetails = async () => {
    const planet = await PlanetService.getById(id!);
    setPlanet(id!, planet);
  };

  const handleRemovePlanet = () => {
    const name = data?.name;
    removePlanet(id!);
    navigate("/");
    toast({
      status: "success",
      title: `Success! Planet ${name} was removed from our system.`,
      position: "top-right"
    });
  };

  useEffect(() => {
    if (!data) {
      getPlanetDetails();
    }
  }, []);

  return (
    <Flex w="full" minH="100vh">
      <Center bgImage={`url(${stars})`} bgSize="200px" w="full">
        <Circle size={60} bgColor={planetColor} boxShadow={`0px 0px 30px 0px ${planetColor}`} />
      </Center>
      <Box w="full" bg="gray.700" p={8}>
        <Heading color="gray.50">{data?.name}</Heading>
        <Text>Diameter: {data?.diameter}</Text>
        <Text>Climate: {data?.climate}</Text>
        <Text>Terrain: {data?.terrain}</Text>
        {/* TODO: add residents lists */}
        <Text>Population: {data?.population}</Text>
        <Text>Residents: </Text>

        <Flex mt={6} gap={4}>
          <Button variant="primary" to={`/${id}/edit`} as={Link}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleRemovePlanet}>
            Remove
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
