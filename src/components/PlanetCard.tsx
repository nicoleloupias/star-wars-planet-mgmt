import { Box, Card, Center, Circle, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import stars from "../assets/stars.png";
import { Planet } from "../services/types/Planet";

interface PlanetCardProps extends FlexProps, Planet {}

export const PlanetCard = ({ name, diameter, climate, terrain, population, ...props }: PlanetCardProps) => {
  const getRandomColor = () => {
    const stringUniqueHash = [...name].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 35%,  45%)`;
  };

  const planetColor = getRandomColor();

  return (
    <Card
      as={Link}
      w={80}
      h={420}
      borderRadius={12}
      bgColor="gray.700"
      overflow="hidden"
      _hover={{
        ".planet": {
          width: "400px",
          height: "400px"
        }
      }}
      {...props}
    >
      <Center h="224px" bgImage={`url(${stars})`} bgSize="200px">
        <Circle className="planet" mx="auto" size={40} bgColor={planetColor} transition="0.4s ease-out all" />
      </Center>

      <Box px={4} py={4} bgColor="gray.700" minH={196} color="gray.200" position="absolute" bottom={0} w="full">
        <Heading color="gray.50">{name}</Heading>
        <Text>Diameter: {diameter}</Text>
        <Text>Climate: {climate}</Text>
        <Text>Terrain: {terrain}</Text>
        <Text>Population: {population}</Text>
      </Box>
    </Card>
  );
};
