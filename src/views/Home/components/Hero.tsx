import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import darth from "../../../assets/Darth-Vader-PNG-HD-Image.png";

export const Hero = () => {
  return (
    <Flex overflow="hidden" w="full" minH="100vh" bg="red.500" alignItems="center" py={20} pos="relative">
      <Box zIndex={1} ml={{ base: 4, lg: 12 }} alignSelf="stretch" w="1px" bgColor="white"></Box>
      <Heading
        zIndex={1}
        fontWeight={900}
        ml={{ base: 6, lg: 40 }}
        maxW={{ base: "300px", lg: "520px" }}
        fontSize={{ base: "4rem", lg: "5rem" }}
        textTransform="uppercase"
      >
        Explore the galaxy
      </Heading>
      <Box mr={{ base: 4, lg: 12 }} ml="auto" alignSelf="stretch" w="1px" bgColor="white"></Box>

      <Text zIndex={1} pos="absolute" bottom={20} left={52}>
        Scroll
      </Text>
      <Img src={darth} width={{ base: "full", lg: "70%" }} pos="absolute" bottom={-20} right={15} />
    </Flex>
  );
};
