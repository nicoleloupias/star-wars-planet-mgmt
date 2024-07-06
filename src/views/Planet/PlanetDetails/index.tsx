import { Box, Button, Center, Circle, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { usePlanetsStore } from "../../../hooks/usePlanetsStore";
import stars from "../../../assets/stars.png";
import { useEffect } from "react";
import { getRandomPlanetColor } from "../../../helpers/planet";

export const PlanetDetails = () => {
  const { id } = useParams();
  const data = usePlanetsStore((store) => store.getById)(id || "1");
  const planetColor = getRandomPlanetColor(data?.name);

  const getPlanetDetails = () => {};

  useEffect(() => {
    getPlanetDetails();
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

        <Button variant="primary" mt={6} to={`/${id}/edit`} as={Link}>
          Edit
        </Button>
      </Box>
    </Flex>
  );
};
