import type { FlexProps } from "@chakra-ui/react";
import { Box, Card, Center, Circle, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import stars from "../../../assets/stars.png";
import { getRandomPlanetColor } from "../../../utils/planet";
import type { Planet } from "../../../hooks/usePlanetsStore";

export interface PlanetCardProps
  extends Omit<FlexProps, "id">,
    Pick<Planet, "name" | "climate" | "diameter" | "terrain" | "population" | "id"> {}

export const PlanetCard = ({ id, name, diameter, climate, terrain, population, ...props }: PlanetCardProps) => {
  const planetColor = getRandomPlanetColor(name);

  const getCircleSize = () => {
    if (diameter === "unknown" || !parseInt(diameter)) return "160px";
    const maxDiameter = 200;
    const minDiameter = 40;
    const scaledDiameter = (parseInt(diameter) / 10000) * maxDiameter;
    const adjustedDiameter = Math.max(Math.min(scaledDiameter, maxDiameter), minDiameter);

    return `${adjustedDiameter}px`;
  };

  return (
    <Card
      as={Link}
      to={`/${id}`}
      w={80}
      h={420}
      borderRadius={30}
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
      data-testid="planet-card"
      {...props}
    >
      <Center overflow="hidden" h="224px" bgImage={`url(${stars})`} bgSize="200px">
        <Circle
          className="planet"
          mx="auto"
          size={getCircleSize()}
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
        textTransform="capitalize"
      >
        <Heading color="gray.50" as="h3" fontWeight={"800"}>
          {name}
        </Heading>
        <Text>
          Diameter: {diameter}{" "}
          {diameter !== "unknown" && (
            <Box as="span" textTransform="lowercase">
              km
            </Box>
          )}
        </Text>
        <Text>Climate: {climate}</Text>
        <Text>Terrain: {terrain}</Text>
        <Text>Habitants: {population}</Text>
      </Box>
    </Card>
  );
};
