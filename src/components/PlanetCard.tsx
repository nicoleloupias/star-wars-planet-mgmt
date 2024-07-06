import { Box, Card, Center, Circle, FlexProps, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import stars from "../assets/stars.png";
import { getRandomPlanetColor } from "../helpers/planet";
import { Planet } from "../hooks/usePlanetsStore";

interface PlanetCardProps extends Omit<FlexProps, "id">, Planet {}

export const PlanetCard = ({ id, name, diameter, climate, terrain, population, url, ...props }: PlanetCardProps) => {
  const planetColor = getRandomPlanetColor(name);

  return (
    <Card
      as={Link}
      to={`/${id}`}
      w={80}
      h={420}
      borderRadius={12}
      overflow="hidden"
      bgColor="transparent"
      _hover={{
        ".planet": {
          width: "400px",
          height: "400px"
        },
        ".cardDetails": {
          backgroundImage: "linear-gradient(180deg, rgba(255,18,73,0.5) 0%, rgba(255,0,0,0)) 70%"
        }
      }}
      borderWidth="1px"
      borderColor={"rgba(255, 18, 73, 0.2)"}
      {...props}
    >
      <Center overflow="hidden" h="224px" bgImage={`url(${stars})`} bgSize="200px">
        <Circle
          className="planet"
          mx="auto"
          size={40}
          bgColor={planetColor}
          boxShadow={`0px 0px 30px 0px ${planetColor}`}
          transition="0.5s ease-out all"
        />
      </Center>

      <Box
        px={4}
        py={4}
        backgroundImage="linear-gradient(180deg, rgba(255,18,73,0.3) 0%, rgba(255,0,0,0)) 70%"
        minH={196}
        color="gray.200"
        position="absolute"
        bottom={0}
        w="full"
        className="cardDetails"
      >
        <Heading color="gray.50">{name}</Heading>
        <Text>Diameter: {diameter}</Text>
        <Text>Climate: {climate}</Text>
        <Text>Terrain: {terrain}</Text>
        <Text>Population: {population}</Text>
      </Box>
    </Card>
  );
};
